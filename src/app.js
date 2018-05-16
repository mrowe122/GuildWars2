import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import routes from 'utils/routes'

// modules
import { Header, Footer } from 'components'
import { Home, PlayerAccount } from 'pages'
import theme from 'styles/variables'

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Header />
        <div>
          <Switch>
            <Route exact path={routes.index} component={Home} />
            <Route path={routes.account} component={PlayerAccount} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
