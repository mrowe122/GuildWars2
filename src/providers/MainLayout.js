import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Header, Footer, FullPageLoader } from 'components'
import MenuIcon from 'mdi-react/MenuIcon'

const { Provider, Consumer } = createContext()

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1rem;
  position: fixed;
  box-sizing: border-box;
  margin-top: ${({ theme }) => theme.sizes.header};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  ${({ customClasses }) => customClasses}
`

const Content = styled.div`
  flex: 1 0 auto;
  padding: 2rem 2rem 1rem;
  margin-top: ${({ theme }) => theme.sizes.header};
  margin-left: ${({ theme }) => theme.sizes.sideNav};
  ${({ customClasses }) => customClasses}
`

const PivotBarTemplate = ({ className, items = [] }) => (
  <div className={className}>
    <div>
      <MenuIcon className='menu' />
    </div>
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
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndexLayers.pivotBar};
  background-color: ${({ theme }) => theme.colors.primary};

  .mdi-icon {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    fill: ${({ theme }) => theme.colors.white};
  }

  & > div {
    height: ${({ theme }) => theme.sizes.header};
    display: flex;
    align-items: center;

    .mdi-icon {
      cursor: pointer;
      padding: 0.9rem;

      &:hover {
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors.primaryDark1};
      }
    }
  }

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
      &:hover { box-shadow: none; }
      background-color: ${({ theme }) => theme.colors.primaryLight1};
    }

    &:first-of-type { margin-top: 1.5rem; }
  }
`

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
    ${Footer} { margin-top: auto; }
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
