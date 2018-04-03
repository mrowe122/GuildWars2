import React, { Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// modules
import { Home } from 'modules'
import { Header, Footer } from 'components'

const App = () => (
  <Fragment>
    <Header />
    <BrowserRouter>
      <Route exact path='/' component={Home} />
    </BrowserRouter>
    <Footer />
  </Fragment>
)

export default App
