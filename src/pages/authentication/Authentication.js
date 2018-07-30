/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { compose, getOr } from 'lodash/fp'
import { Redirect } from 'react-router-dom'
import routes from 'routes'
import { Layout } from 'providers/MainLayout'

import CreateAccount from './components/CreateAccount'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'

export const Authentication = ({ authenticationState, showLogin, showCreate, showApikey, authComplete }) => (
  <Layout>
    {({ Content }) => (
      <Content>
        {authenticationState === 'login' && <SignIn authComplete={authComplete} showCreate={showCreate} />}
        {authenticationState === 'create' && <CreateAccount showLogin={showLogin} showApikey={showApikey} />}
        {authenticationState === 'apiKey' && <ApiKey authComplete={authComplete} />}
        {authenticationState === 'loggedIn' && <Redirect to={routes.account.characters} />}
      </Content>
    )}
  </Layout>
)

Authentication.propTypes = {
  authenticationState: PropTypes.string,
  showLogin: PropTypes.func,
  showCreate: PropTypes.func,
  showApikey: PropTypes.func,
  authComplete: PropTypes.func
}

const AuthenticationEnhancer = compose(
  withStateHandlers(
    ({ location }) => ({
      authenticationState: getOr('login', 'state.authState')(location)
    }),
    {
      showLogin: () => () => ({ authenticationState: 'login' }),
      showCreate: () => () => ({ authenticationState: 'create' }),
      showApikey: () => () => ({ authenticationState: 'apiKey' }),
      authComplete: () => () => ({ authenticationState: 'loggedIn' })
    }
  )
)(Authentication)

export default AuthenticationEnhancer
