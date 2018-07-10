import React, { createContext } from 'react'

const _contexts = {}

export const withProvider = (name, value) => Component => props => {
  if (typeof name !== 'string') {
    throw Error(`Context name must be a string`)
  }

  if (!_contexts[name]) {
    _contexts[name] = createContext()
  }

  const ProviderTmp = _contexts[name].Provider
  return (
    <ProviderTmp value={typeof value === 'function' ? value(props) : value}>
      <Component {...props} />
    </ProviderTmp>
  )
}

export const withConsumer = name => Component => props => {
  if (!_contexts[name]) {
    throw Error(`Context "${name}" does not exist`)
  }

  const ConsumerTmp = _contexts[name].Consumer
  return (
    <ConsumerTmp>
      {value => <Component {...props} {...value} />}
    </ConsumerTmp>
  )
}
