import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { compose } from 'lodash/fp'
import { Redirect } from 'react-router-dom'
import { Layout } from 'providers/MainLayout'
import routes from 'utils/routes'

import CreateAccount from './components/CreateAccount'
import SignIn from './components/SignIn'
import ApiKey from './components/ApiKey'

export const Authentication = ({ authenticationState, showLogin, showCreate, showApikey, userLoggedIn }) => (
  <Layout>
    {
      ({ Container, Content }) => (
        <Container header>
          <Content>
            { authenticationState === 'login' && <SignIn showCreate={showCreate} userLoggedIn={userLoggedIn} />}
            { authenticationState === 'create' && <CreateAccount showLogin={showLogin} showApikey={showApikey} />}
            { authenticationState === 'apiKey' && <ApiKey userLoggedIn={userLoggedIn} />}
            { authenticationState === 'loggedIn' && <Redirect to={routes.account.characters} />}
          </Content>
        </Container>
      )
    }
  </Layout>
)

Authentication.propTypes = {
  authenticationState: PropTypes.string,
  showLogin: PropTypes.func,
  showCreate: PropTypes.func,
  showApikey: PropTypes.func,
  userLoggedIn: PropTypes.func
}

export default compose(
  withStateHandlers(
    () => ({
      authenticationState: 'login'
    }),
    {
      showLogin: () => () => ({ authenticationState: 'login' }),
      showCreate: () => () => ({ authenticationState: 'create' }),
      showApikey: () => () => ({ authenticationState: 'apiKey' }),
      userLoggedIn: () => () => ({ authenticationState: 'loggedIn' })
    }
  )
)(Authentication)
