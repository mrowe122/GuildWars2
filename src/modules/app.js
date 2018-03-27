import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const Home = () => <div>Home</div>

export default () => (
  <BrowserRouter>
    <Route exact path='/' component={Home} />
  </BrowserRouter>
)
