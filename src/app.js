import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import routes from 'utils/routes'

// modules
import { LayoutProvider } from 'components/MainLayout'
import { Home, PlayerAccount } from 'pages'
import theme from 'styles/variables'

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LayoutProvider>
        <div className='app'>
          <Switch>
            <Route exact path={routes.index} component={Home} />
            <Route path={routes.account.index} component={PlayerAccount} />
          </Switch>
        </div>
      </LayoutProvider>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
