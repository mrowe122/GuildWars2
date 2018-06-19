/* istanbul ignore file */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import routes from 'utils/routes'

// modules
import { LayoutProvider } from 'providers/MainLayout'
import { Home, Authorized, PlayerAccount, Authentication } from 'pages'
import theme from 'styles/variables'

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LayoutProvider>
        <Switch>
          <Route exact path={routes.index} component={Home} />
          <Route path={routes.authorize} component={Authentication} />
          <Authorized path={routes.account.index} component={PlayerAccount} />
        </Switch>
      </LayoutProvider>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
