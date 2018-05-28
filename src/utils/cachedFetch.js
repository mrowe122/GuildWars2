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

export const fetchHoc = (url, { dataProp = 'data', skip = false, props, method = 'onLoad' }, fetchOptions) => compose(
  withProps(() => ({ controller: new AbortController() })),
  lifecycle({ componentWillUnmount () { this.props.controller.abort() } }),
  withStateHandlers(
    () => ({ loading: (method !== 'onDemand' && !skip), [dataProp]: undefined }),
    {
      startLoading: () => () => ({ loading: true }),
      finishedLoading: () => data => ({ loading: false, [dataProp]: data }),
      handleError: () => data => ({ loading: false, errorStatus: data })
    }
  ),
  withHandlers({
    getFetch: ({ startLoading, finishedLoading, controller, handleError }) => variables => {
      if (!skip) {
        startLoading()
        cachedFetch(parseUrl(url, variables), merge(fetchOptions, { signal: controller.signal }))
          .then(data => defer(() => finishedLoading(JSON.parse(data).body)))
          .catch(err => {
            if (err.name !== 'AbortError') {
              defer(() => handleError(err))
            }
          })
      }
    }
  }),
  branch(
    () => typeof props === 'function',
    withProps(props)
  ),
  branch(
    () => method === 'onLoad',
    lifecycle({ componentDidMount () { this.props.getFetch() } })
  ),
  mapProps(omit([
    'startLoading',
    'controller',
    'handleError',
    'finishedLoading',
    'history',
    'location',
    'match',
    'staticContext'
  ]))
)
