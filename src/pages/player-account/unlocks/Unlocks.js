/* istanbul ignore file */
import React, { Fragment } from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'
import routes from 'routes'

import Dyes from './components/Dyes'
import Finishers from './components/Finishers'
import Minis from './components/Minis'
import Skins from './components/Skins'
import Titles from './components/Titles'

const unlockNav = [
  {
    label: 'Skins',
    link: routes.account.unlocks.skins
  },
  {
    label: 'Dyes',
    link: routes.account.unlocks.dyes
  },
  {
    label: 'Minis',
    link: routes.account.unlocks.minis
  },
  {
    label: 'Finishers',
    link: routes.account.unlocks.finishers
  },
  {
    label: 'Titles',
    link: routes.account.unlocks.titles
  }
]

const contentCSS = ({ theme }) => css`
  margin-left: ${theme.sizes.sideNav};
`

const Unlocks = () => (
  <Layout>
    {({ Content, SideNav }) => (
      <Fragment>
        <SideNav>
          <h2>Unlocks</h2>
          {unlockNav.map(i => (
            <NavLink key={i.label} to={i.link}>
              {i.label}
            </NavLink>
          ))}
        </SideNav>
        <Content styles={contentCSS}>
          <Switch>
            <Route path={routes.account.unlocks.skins} component={Skins} />
            <Route path={routes.account.unlocks.dyes} component={Dyes} />
            <Route path={routes.account.unlocks.minis} component={Minis} />
            <Route path={routes.account.unlocks.finishers} component={Finishers} />
            <Route path={routes.account.unlocks.titles} component={Titles} />
            <Redirect to={routes.account.unlocks.skins} />
          </Switch>
        </Content>
      </Fragment>
    )}
  </Layout>
)

export default Unlocks
