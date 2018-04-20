import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

// modules
import { Header, Footer } from 'components'
import { Home } from 'modules'
import theme from 'styles/variables'

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Header />
      <BrowserRouter>
        <Route exact path='/' component={Home} />
      </BrowserRouter>
      <Footer />
    </Fragment>
  </ThemeProvider>
)

export default App
