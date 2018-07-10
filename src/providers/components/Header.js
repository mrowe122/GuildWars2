import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { compose } from 'lodash/fp'
import { withHandlers } from 'recompose'
import { withAuthentication } from 'providers/Authenticated'
import routes from 'routes'
import { Dropdown, withDropdown, Logo } from 'components'

export const Header = ({ className, authUser, handleDropdown, handleSignOut }) => (
  <div className={className}>
    <Logo />
    {authUser.token
      ? (
        <div className='wrapper'>
          <img src='/media/logos/path_of_fire.png' onClick={handleDropdown} />
          <Dropdown arrow='70%' dropdown='20%'>
            <Link to={routes.account.index}>Account</Link>
            <a onClick={handleSignOut}>Sign Out</a>
          </Dropdown>
        </div>
      )
      : <Link to={routes.authorize}>Sign In</Link>}
  </div>
)

Header.propTypes = {
  className: PropTypes.string,
  authUser: PropTypes.object,
  handleDropdown: PropTypes.func,
  handleSignOut: PropTypes.func
}

const EnhancedHeader = compose(
  withDropdown,
  withAuthentication,
  withRouter,
  withHandlers({
    handleSignOut: ({ authUser, history }) => () =>
      authUser.firebase.signOut().then(() => history.push(routes.index))
  })
)(Header)

export default styled(EnhancedHeader)`
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
    padding: 0.7rem;
    border: 2px solid transparent;
    cursor: pointer;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLight1};
    }
  }

  .wrapper {
    position: relative;
  }

  img {
    cursor: pointer;
    height: calc(${({ theme }) => theme.sizes.header} - 1rem);
    width: calc(${({ theme }) => theme.sizes.header} - 1rem);
    padding: 0.3rem;
    margin: 0 .5rem;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: mediumslateblue;
  }
`
