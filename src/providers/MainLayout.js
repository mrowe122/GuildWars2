/* istanbul ignore file */
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { compose } from 'lodash/fp'
import { withStateHandlers } from 'recompose'

import Header from './components/Header'
import Footer from './components/Footer'
import PivotBar from './components/PivotBar'
import SideNav from './components/SideNav'
import Content from './components/Content'
import { FullPageLoader } from 'components'

const ContainerTemplate = ({ className, children, token, handleMenu }) => (
  <div className={className}>
    <Header />
    {token && <PivotBar handleMenu={handleMenu} />}
    {children}
    <Footer />
  </div>
)

ContainerTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  token: PropTypes.string,
  handleMenu: PropTypes.func
}

const ContainerStyled = styled(ContainerTemplate)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ token, theme }) =>
    token &&
    css`
    padding-left: ${theme.sizes.pivotBar};
    ${theme.generators.transition(200, 'ease-out')};

    ${Header}, ${SideNav}, ${FullPageLoader} {
      margin-left: ${theme.sizes.pivotBar};
      ${theme.generators.transition(200, 'ease-out')};
    }

    ${Footer} { margin-top: auto; }
  `} ${({ expanded, theme }) =>
    expanded &&
    css`
    padding-left: ${theme.sizes.pivotBarExpanded};

    ${PivotBar} {
      width: ${theme.sizes.pivotBarExpanded};
    }

    ${Header}, ${SideNav}, ${FullPageLoader} {
      margin-left: ${theme.sizes.pivotBarExpanded};
    }
  `};
`

const Container = compose(
  withStateHandlers(() => ({ expanded: false }), { handleMenu: ({ expanded }) => () => ({ expanded: !expanded }) })
)(ContainerStyled)

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
