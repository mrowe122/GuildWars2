import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { branch, renderComponent } from 'recompose'
import { withAuthentication } from 'providers/Authenticated'
import routes from 'routes'

export const Authorized = ({ path, component, location }) => {
  if (location.pathname === '/account') {
    return <Redirect to={routes.account.characters} />
  }

  return <Route path={path} component={component} />
}

Authorized.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func,
  location: PropTypes.object
}

const AuthorizedEnhancer = compose(
  withAuthentication,
  branch(
    ({ authUser }) => !authUser.token,
    renderComponent(routes.redirect(routes.authorize))
  )
)(Authorized)

export default AuthorizedEnhancer
