import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import routes from 'utils/routes'
import Logo from './Logo'

const HeaderTemplate = ({ className }) => (
  <div className={className}>
    <Logo />
    <div>
      <Link to={routes.stats}>Stats</Link>
      <Link to={routes.index}>Login</Link>
    </div>
  </div>
)

HeaderTemplate.propTypes = {
  className: PropTypes.string
}

const Header = styled(HeaderTemplate)`
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndexLayers.header};
  position: fixed;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  height: ${({ theme }) => theme.sizes.header};
  line-height: ${({ theme }) => theme.sizes.header};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 15, 0, 'rgba(0, 0, 0, 0.3)')}

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 5px;
    margin: 0 .5rem;
    padding: 0.7rem 1.2rem;
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover { background-color: ${({ theme }) => theme.colors.primaryHover}; }
  }

  & > div:nth-child(2) {
    display: flex;
  }

  .mdi-icon {
    height: 26px;
    width: 26px;
    cursor: pointer;
    padding: .4rem;
    fill: white;
  }
`

export default Header
