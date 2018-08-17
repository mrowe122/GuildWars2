import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { NavLink } from 'react-router-dom'
import MenuIcon from 'mdi-react/MenuIcon'

const PivotBar = ({ className, items = [], handleMenu, loading }) => (
  <div className={className}>
    <div className='menu'>
      <MenuIcon onClick={handleMenu} size={22} />
    </div>
    {items.map(i => (
      <NavLink key={i.title} to={i.link} disabled={!i.access} title={i.title}>
        {i.icon} {i.title}
      </NavLink>
    ))}
  </div>
)

PivotBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  handleMenu: PropTypes.func,
  loading: PropTypes.bool
}

export default styled(PivotBar)`
  width: ${({ theme }) => theme.sizes.pivotBar};
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
    vertical-align: middle;
    padding: 0.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
  }

  a,
  .menu {
    color: ${({ theme }) => theme.colors.white};
    white-space: nowrap;
    text-decoration: none;

    &:focus {
      outline: none;
    }
  }

  .menu {
    cursor: pointer;
    line-height: ${({ theme }) => theme.sizes.header};

    .mdi-icon {
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary2};
      }
    }
  }

  a {
    margin-top: 1.5rem;

    .mdi-icon {
      background-color: ${({ theme }) => theme.colors.primary2};
    }

    &:hover {
      .mdi-icon {
        ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primaryLight1)};
      }
    }

    &.active {
      .mdi-icon {
        background-color: ${({ theme }) => theme.colors.primaryLight1};
      }
    }

    &[disabled] {
      pointer-events: none;
    }
  }
`
