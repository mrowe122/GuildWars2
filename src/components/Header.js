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
      <Link to={routes.account.characters}>Account</Link>
      {/* <Link to={routes.index}>Login</Link> */}
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
  height: ${({ theme }) => theme.sizes.header};
  line-height: ${({ theme }) => theme.sizes.header};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 15, 0, '#000')}
  ${({ theme }) => theme.generators.gradient('#1f2730', '#27303c')}

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 5px;
    margin: 0 .5rem;
    padding: 0.7rem;
    border: 2px solid transparent;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
    &:hover { border-color: ${({ theme }) => theme.colors.primary}; }
  }

  & > div:nth-child(2) {
    display: flex;
  }

  .mdi-icon {
    height: 26px;
    width: 26px;
    cursor: pointer;
    padding: .4rem;
    fill: ${({ theme }) => theme.colors.white};
  }
`

export default Header
