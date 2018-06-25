/* istanbul ignore file */
import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import routes from 'routes'

// modules
import { LayoutProvider } from 'providers/MainLayout'
import { AuthenticationProvider } from 'providers/Authenticated'
import { Home, Authorized, PlayerAccount, Authentication } from 'pages'
import theme from 'styles/variables'

const App = props => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthenticationProvider {...props}>
        <LayoutProvider>
          <Switch>
            <Route exact path={routes.index} component={Home} />
            <Route path={routes.authorize} component={Authentication} />
            <Authorized path={routes.account.index} component={PlayerAccount} />
            <Redirect to={routes.index} />
          </Switch>
        </LayoutProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
