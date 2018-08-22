/* istanbul ignore file */
import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { compose } from 'lodash/fp'
import { ThemeProvider } from 'emotion-theming'
import { withProvider } from 'context-hoc'
import routes from 'routes'

// modules
import { LayoutProvider } from 'providers/MainLayout'
import { Home, Authorized, PlayerAccount, Authentication } from 'pages'
import theme from 'styles/variables'

const App = props => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LayoutProvider {...props}>
        <Switch>
          <Route exact path={routes.index} component={Home} />
          <Route path={routes.authenticate} component={Authentication} />
          <Authorized path={routes.account.index} component={PlayerAccount} />
          <Redirect to={routes.index} />
        </Switch>
      </LayoutProvider>
    </ThemeProvider>
  </BrowserRouter>
)

const AppEnhancer = compose(
  withProvider('app', ({ authUser }) => ({ authUser }))
)(App)

export default AppEnhancer
