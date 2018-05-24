import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Header, Footer, FullPageLoader } from 'components'

const { Provider, Consumer } = createContext()

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1rem;
  box-sizing: border-box;
  position: fixed;
  margin-top: ${({ theme }) => theme.sizes.header};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  ${({ customClasses }) => customClasses}
`

SideNav.displayName = 'SideNavDisplayName'

const Content = styled.div`
  flex: 1 0 auto;
  padding: 2rem 2rem 0;
  margin-top: ${({ theme }) => theme.sizes.header};
  margin-left: ${({ theme }) => theme.sizes.sideNav};
  ${({ customClasses }) => customClasses}
`

Content.displayName = 'ContentDisplayName'

const PivotBarTemplate = ({ className, items = [] }) => (
  <div className={className}>
    {items.map(i => (
      <NavLink to={i.link} activeClassName='active' key={i.title} title={i.title}>{i.icon}</NavLink>
    ))}
  </div>
)

PivotBarTemplate.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array
}

const PivotBar = styled(PivotBarTemplate)`
  width: ${({ theme }) => theme.sizes.pivotBar};
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndexLayers.pivotBar};
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.sizes.header};

  a {
    padding: 0.9rem;
    margin-bottom: 1.5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primaryDark1};
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};

    &:hover {
      ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primaryLight1)}
    }

    &.active {
      &:hover {
        ${({ theme }) => theme.generators.boxShadow(0, 0, 0, 0, theme.colors.primaryLight1)}
      }
      background-color: ${({ theme }) => theme.colors.primaryLight1};
    }
  }

  .mdi-icon {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    fill: ${({ theme }) => theme.colors.white};
  }
`

PivotBar.displayName = 'PivotBarDisplayName'

const ContainerTemplate = ({ className, children, header, footer }) => {
  return (
    <div className={className}>
      {header && <Header />}
      {children}
      {footer && <Footer />}
    </div>
  )
}

ContainerTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  header: PropTypes.bool,
  footer: PropTypes.bool
}

const Container = styled(ContainerTemplate)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  ${({ pivotBar, theme }) => pivotBar && css`
    ${Header}, ${Footer} { margin-left: ${theme.sizes.pivotBar}; }
  `}
`

export const Layout = Consumer

export const LayoutProvider = ({ children }) => (
  <Provider value={{ Container, PivotBar, SideNav, Content, FullPageLoader }}>
    {children}
  </Provider>
)

LayoutProvider.propTypes = {
  children: PropTypes.node
}
