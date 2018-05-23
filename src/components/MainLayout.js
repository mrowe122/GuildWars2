import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'

const { Provider, Consumer } = createContext()

const Template = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

Template.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const PivotBar = styled(Template)`
  color: pink;
  position: fixed;
  left:0;
  width: 50px;
  background-color: black;
  top: 0;
  bottom: 0;
  z-index: 999999;
`

const SideNav = styled(Template)`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.gray4};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  ${({ customClasses = null }) => customClasses};
`

const Content = styled(Template)`
  padding: 2rem 2rem 0;
  margin-left: ${({ theme }) => theme.sizes.sideNav};
  ${({ customClasses = null }) => customClasses};
`

export const Layout = Consumer

export const LayoutProvider = ({ children }) => (
  <Provider value={{ Header, Footer, PivotBar, SideNav, Content }}>
    {children}
  </Provider>
)

LayoutProvider.propTypes = {
  children: PropTypes.node
}
