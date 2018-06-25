import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { withContext } from 'with-context'

const AuthenticatedContext = createContext()

const AuthenticationProvider = ({ children, authUser }) => (
  <AuthenticatedContext.Provider value={authUser}>
    {children}
  </AuthenticatedContext.Provider>
)

AuthenticationProvider.propTypes = {
  children: PropTypes.node,
  authUser: PropTypes.shape({
    token: PropTypes.string
  })
}

const withAuthentication = withContext(AuthenticatedContext, 'authUser')
const AuthenticationConsumer = AuthenticatedContext.Consumer

export { AuthenticationProvider, AuthenticationConsumer, withAuthentication }
