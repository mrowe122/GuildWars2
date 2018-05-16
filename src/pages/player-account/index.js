import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from 'utils/routes'

import Characters from './characters/Characters'

const AccountRedirect = () => <Redirect to={routes.account.characters} />

const PlayerAccount = () => (
  <Switch>
    <Route exact path={routes.account.index} component={AccountRedirect} />
    <Route path={routes.account.characters} component={Characters} />
  </Switch>
)

export default PlayerAccount
