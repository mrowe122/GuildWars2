import { compose, defer, omit, merge } from 'lodash/fp'
import { withStateHandlers, withHandlers, withProps, lifecycle, branch, mapProps } from 'recompose'

export const cachedFetch = (url, options) => {
  let expiry = 5 * 60 // 5 min default
  if (typeof options === 'number') {
    expiry = options
    options = undefined
  } else if (typeof options === 'object') {
    // I hope you didn't set it to 0 seconds
    expiry = options.seconds || expiry
  }
  // Use the URL as the cache key to sessionStorage
  let cacheKey = url
  let cached = sessionStorage.getItem(cacheKey)
  let whenCached = sessionStorage.getItem(cacheKey + ':ts')
  if (cached !== null && whenCached !== null) {
    // it was in sessionStorage! Yay!
    // Even though 'whenCached' is a string, this operation
    // works because the minus sign converts the
    // string to an integer and it will work.
    let age = (Date.now() - whenCached) / 1000
    if (age < expiry) {
      let response = new Response(new Blob([cached]))
      return Promise.resolve(response)
    } else {
      // We need to clean up this old key
      sessionStorage.removeItem(cacheKey)
      sessionStorage.removeItem(cacheKey + ':ts')
    }
  }

  return fetch(url, options).then(response => {
    // let's only store in cache if the content-type is
    // JSON or something non-binary
    if (response.status === 200) {
      let ct = response.headers.get('Content-Type')
      if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        // There is a .json() instead of .text() but
        // we're going to store it in sessionStorage as
        // string anyway.
        // If we don't clone the response, it will be
        // consumed by the time it's returned. This
        // way we're being un-intrusive.
        response.clone().text().then(content => {
          sessionStorage.setItem(cacheKey, content)
          sessionStorage.setItem(cacheKey + ':ts', Date.now())
        })
      }
    }
    return response
  })
}

const catchError = err => {
  if (err.name !== 'AbortError') {
    console.log('error', err)
  }
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
      finishedLoading: () => data => ({ loading: false, [dataProp]: data })
    }
  ),
  withHandlers({
    fetchData: ({ startLoading, finishedLoading, controller }) => variables => {
      if (!skip) {
        startLoading()
        fetch(parseUrl(url, variables), merge(fetchOptions, { signal: controller.signal }))
          .then(res => res.json())
          .then(data => defer(() => finishedLoading(data)))
          .catch(catchError)
      }
    }
  }),
  branch(
    () => typeof props === 'function',
    withProps(props)
  ),
  branch(
    () => method === 'onLoad',
    lifecycle({ componentDidMount () { this.props.fetchData() } })
  ),
  mapProps(omit([
    'controller',
    'finishedLoading',
    'history',
    'location',
    'match',
    'staticContext'
  ]))
)
