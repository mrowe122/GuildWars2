/* istanbul ignore file */
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { compose, noop } from 'lodash/fp'
import { withStateHandlers, withProps } from 'recompose'
import { NavLink } from 'react-router-dom'
import { FullPageLoader } from 'components'
import Header from './components/Header'
import Footer from './components/Footer'
import MenuIcon from 'mdi-react/MenuIcon'

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 2rem;
  position: fixed;
  box-sizing: border-box;
  top: ${({ theme }) => theme.sizes.header};
  background-color: ${({ theme }) => theme.colors.loadingOverlay};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primary)};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  ${({ customClasses }) => customClasses};
`

const Content = styled.div`
  max-width: 1070px;
  flex: 1 0 auto;
  padding: 2rem 2rem 1rem;
  margin-top: ${({ theme }) => theme.sizes.header};
  ${({ customClasses }) => customClasses};
`

const PivotBarTemplate = ({ className, items = [], expanded, handleMenu, onClick }) => (
  <div className={className}>
    <div>
      <MenuIcon onClick={handleMenu} /> {expanded && 'Guild Wars 2'}
    </div>
    {items.map(i => (
      <NavLink
        key={i.title}
        to={i.link}
        activeClassName='active'
        disabled={!i.access}
        title={i.title}
        onClick={onClick}>{i.icon} {expanded && i.title}</NavLink>
    ))}
  </div>
)

PivotBarTemplate.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  expanded: PropTypes.bool,
  handleMenu: PropTypes.func,
  onClick: PropTypes.func
}

const PivotBar = compose(
  withStateHandlers(
    () => ({ expanded: false }),
    { handleMenu: ({ expanded }) => () => ({ expanded: !expanded }) }
  ),
  withProps(({ handleMenu, expanded }) => ({
    onClick: expanded ? handleMenu : noop
  }))
)(styled(PivotBarTemplate)`
  width: ${({ theme, expanded }) => expanded ? '15rem' : theme.sizes.pivotBar};
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  padding: 0 13px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: start;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndexLayers.pivotBar};
  background-color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.generators.transition(200, 'ease-out')};

  .mdi-icon {
    width: 22px;
    height: 22px;
    vertical-align: middle;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
  }

  & > div, a {
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    text-decoration: none;

    .mdi-icon {
      cursor: pointer;
      padding: 0.5rem;
      margin-right: 1rem;
      border-radius: 50%;
    }
  }

  & > div {
    height: ${({ theme }) => theme.sizes.header};
    display: flex;
    align-items: center;

    .mdi-icon {
      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryDark1};
      }
    }
  }

  a {
    margin-bottom: 1.5rem;

    &:first-of-type { margin-top: 1.5rem; }
    .mdi-icon {
      background-color: ${({ theme }) => theme.colors.primaryDark1};
    }

    &:hover {
      .mdi-icon {
        ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primaryLight1)}
      }
    }

    &.active {
      &:hover {
        .mdi-icon { box-shadow: none; }
      }
      .mdi-icon {
        background-color: ${({ theme }) => theme.colors.primaryLight1};
      }
    }

    &[disabled] {
      pointer-events: none;
    }
  }
`)

const ContainerTemplate = ({ className, children, header, footer }) => (
  <div className={className}>
    {header && <Header />}
    {children}
    {footer && <Footer />}
  </div>
)

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
  align-items: center;
  ${({ pivotBar, theme }) => pivotBar && css`
    ${Header}, ${Footer} { margin-left: ${theme.sizes.pivotBar}; }
    ${Footer} { margin-top: auto; }
  `}
`

const { Provider, Consumer: Layout } = createContext()

const LayoutProvider = ({ children }) => (
  <Provider value={{ Container, PivotBar, SideNav, Content, FullPageLoader }}>
    {children}
  </Provider>
)

LayoutProvider.propTypes = {
  children: PropTypes.node
}

export { Layout, LayoutProvider }
