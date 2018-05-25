import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from 'utils/routes'
import { Layout } from 'providers/MainLayout'

import Achievements from './achievements/Achievements'
import Characters from './characters/Characters'

import AccountMultipleIcon from 'mdi-react/AccountMultipleIcon'
import StarIcon from 'mdi-react/StarIcon'

const AccountRedirect = () => <Redirect to={routes.account.characters} />

const items = [
  {
    title: 'Characters',
    icon: <AccountMultipleIcon />,
    link: routes.account.characters
  },
  {
    title: 'Achievements',
    icon: <StarIcon />,
    link: routes.account.achievements
  }
]

const PlayerAccount = () => (
  <Layout>
    {
      ({ Container, PivotBar }) => (
        <Container header footer pivotBar>
          <PivotBar items={items} />
          <Switch>
            <Route exact path={routes.account.index} component={AccountRedirect} />
            <Route path={routes.account.achievements} component={Achievements} />
            <Route path={routes.account.characters} component={Characters} />
          </Switch>
        </Container>
      )
    }
  </Layout>
)

export default PlayerAccount
