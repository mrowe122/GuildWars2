/* istanbul ignore file */
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import Container from './components/Container'
import SideNav from './components/SideNav'
import Content from './components/Content'

const { Provider, Consumer: Layout } = createContext()

const LayoutProvider = ({ children, authUser }) => (
  <Provider value={{ SideNav, Content }}>
    <Container token={authUser.token}>{children}</Container>
  </Provider>
)

LayoutProvider.propTypes = {
  children: PropTypes.node,
  authUser: PropTypes.object
}

export { Layout, LayoutProvider }
