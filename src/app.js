import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// modules
import { Header, Footer } from 'components'
import { Home, PlayerStats } from 'pages'
import theme from 'styles/variables'

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Header />
        <div className='content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/stats' component={PlayerStats} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
