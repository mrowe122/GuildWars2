import { compose, omit, mergeAll, noop } from 'lodash/fp'
import { withStateHandlers, withHandlers, withProps, lifecycle, branch, mapProps, renderComponent } from 'recompose'
import routes from 'routes'
import { cachedData } from './cachedData'
import { hashString } from 'utils/utilities'

let controller = new AbortController()

const checkErrors = response => {
  if (!response.ok) {
    throw response
  }
  return response.text()
}

const cachedFetch = (url, options, neverCache) => {
  const _hashedUrl = hashString(url)
  const _data = cachedData.get(_hashedUrl)
  return _data && !neverCache
    ? Promise.resolve(_data)
    : fetch(url, options)
      .then(checkErrors)
      .then(cachedData.add(_hashedUrl))
}

const parseUrl = (url, variables) => {
  let _url = url.slice()
  if (variables) {
    for (const prop in variables) {
      _url = _url.replace(`:${prop}`, variables[prop])
    }
  }
  return _url
}

const withHandleErrors = compose(
  branch(
    ({ error }) => (error.status === 400 && location.pathname !== '/act/settings'),
    renderComponent(routes.redirect({ pathname: routes.authenticate, state: { authState: 'apiKey' } }))
  )
)

const withDefaults = ({ dataProp, call, props }) => compose(
  withStateHandlers(
    () => ({
      loading: call !== 'onClick',
      [dataProp]: undefined,
      error: {}
    }),
    {
      startLoading: () => () => ({ loading: true, error: {} }),
      finishedLoading: () => data => ({ loading: false, error: {}, [dataProp]: data }),
      handleError: () => data => ({ loading: false, error: data })
    }
  ),
  lifecycle({
    componentWillUnmount () {
      controller.abort()
    }
  }),
  branch(
    () => typeof props === 'function',
    withProps(props)
  )
)

const omitProps = ['startLoading', 'handleError', 'finishedLoading']

export const fetchHocGet = (
  url,
  { dataProp = 'data', call = 'onLoad', name = 'getFetch', variables = noop, options = { neverCache: false }, props } = {
    dataProp: 'data',
    call: 'onLoad',
    name: 'getFetch',
    variables: noop,
    options: { neverCache: false }
  },
  fetchOptions
) =>
  compose(
    withDefaults({ dataProp, call, props }),
    withHandlers({
      [name]: ({ startLoading, finishedLoading, handleError, ...props }) => () => {
        startLoading()
        controller = new AbortController()
        const _opts = {
          signal: controller.signal
        }
        return cachedFetch(parseUrl(url, variables(props)), mergeAll([fetchOptions, _opts]), options.neverCache)
          .then(data => finishedLoading(JSON.parse(data)))
          .catch(err => {
            if (err.status === 400) {
              cachedData.clearCache()
            }
            if (err.name !== 'AbortError') {
              handleError(err)
            }
          })
      }
    }),
    withHandleErrors,
    branch(
      () => call === 'onLoad',
      lifecycle({
        componentDidMount () {
          this.props[name]()
        }
      })
    ),
    mapProps(omit(omitProps))
  )

export const fetchHocPost = (
  url,
  { dataProp = 'data', props, name = 'postFetch' } = { dataProp: 'data', name: 'postFetch' },
  options
) =>
  compose(
    withDefaults({ dataProp, props, call: 'onClick' }),
    withHandlers({
      [name]: ({ startLoading, finishedLoading, handleError }) => body => {
        startLoading()
        controller = new AbortController()
        const _opts = {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body),
          signal: controller.signal
        }
        return fetch(url, mergeAll([options, _opts]))
          .then(checkErrors)
          .then(data => {
            finishedLoading(data)
            return data
          })
          .catch(err => {
            if (err.name !== 'AbortError') {
              handleError(err)
            }
            return err
          })
      }
    }),
    withHandleErrors,
    mapProps(omit(omitProps))
  )

export const fetchHoc = {
  get: fetchHocGet,
  post: fetchHocPost
}
