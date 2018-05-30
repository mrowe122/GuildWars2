import { compose, defer, omit, merge } from 'lodash/fp'
import { withStateHandlers, withHandlers, withProps, lifecycle, branch, mapProps } from 'recompose'
import { cachedData } from './cachedData'

const handleErrors = response => {
  if (!response.ok) {
    throw response.status
  }
  return response.text()
}

const cachedFetch = (url, options) => {
  const _data = cachedData.get(url)
  return _data
    ? Promise.resolve(_data)
    : fetch(url, options).then(handleErrors).then(cachedData.add(url))
}

const parseUrl = (url, variables) => {
  let _url = url.slice()
  if (variables) {
    for (const prop in variables) {
      _url = url.replace(`:${prop}`, variables[prop])
    }
  }
  return _url
}

const withDefaults = ({ dataProp, call, props }) => compose(
  withProps(() => ({ controller: new AbortController() })),
  lifecycle({ componentWillUnmount () { this.props.controller.abort() } }),
  withStateHandlers(
    () => ({ loading: (call !== 'onClick'), [dataProp]: undefined }),
    {
      startLoading: () => () => ({ loading: true, errorStatus: null }),
      finishedLoading: () => data => ({ loading: false, errorStatus: null, [dataProp]: data }),
      handleError: () => data => ({ loading: false, errorStatus: data })
    }
  ),
  branch(
    () => typeof props === 'function',
    withProps(props)
  )
)

const omitProps = [
  'startLoading',
  'controller',
  'handleError',
  'finishedLoading',
  'history',
  'location',
  'match',
  'staticContext'
]

export const fetchHocGet = (
  url,
  { dataProp = 'data', props, call = 'onLoad', name = 'getFetch' } = { dataProp: 'data', call: 'onLoad', name: 'getFetch' },
  fetchOptions
) => compose(
  withDefaults({ dataProp, call, props }),
  withHandlers({
    [name]: ({ startLoading, finishedLoading, controller, handleError }) => variables => {
      startLoading()
      return cachedFetch(parseUrl(url, variables), merge(fetchOptions, { signal: controller.signal }))
        .then(data => defer(() => finishedLoading(JSON.parse(data).body)))
        .catch(err => {
          if (err.name !== 'AbortError') {
            defer(() => handleError(err))
          }
        })
    }
  }),
  branch(
    () => call === 'onLoad',
    lifecycle({ componentDidMount () { this.props[name]() } })
  ),
  mapProps(omit(omitProps))
)

export const fetchHocPost = (
  url,
  { dataProp = 'data', props, name = 'postFetch', call = 'onClick' } = { dataProp: 'data', call: 'onLoad', name: 'postFetch' },
  fetchOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' }
  }
) => compose(
  withDefaults({ dataProp, props, call }),
  withHandlers({
    [name]: ({ startLoading, finishedLoading, controller, handleError }) => body => {
      startLoading()
      fetch(url, merge(fetchOptions, { body: JSON.stringify(body), signal: controller.signal }))
        .then(handleErrors)
        .then(data => defer(() => finishedLoading(data)))
        .catch(err => {
          if (err.name !== 'AbortError') {
            defer(() => handleError(err))
          }
        })
    }
  }),
  mapProps(omit(omitProps))
)

export const fetchHoc = {
  get: fetchHocGet,
  post: fetchHocPost
}
