import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { compose } from 'lodash/fp'
import { withHandlers } from 'recompose'
import { withConsumer } from 'context-hoc'
import routes from 'routes'
import { Dropdown, withDropdown, Logo } from 'components'
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'

export const Header = ({ className, authUser, handleDropdown, closeDropdown, handleSignOut }) => (
  <div className={className}>
    <Logo />
    {authUser.token ? (
      <div className='wrapper'>
        <AccountOutlineIcon onClick={handleDropdown} />
        <Dropdown arrow='80%' dropdown='-15px' onClick={closeDropdown}>
          <Link className='a2' to={routes.account.settings}>Account Settings</Link>
          <a onClick={handleSignOut} className='a2'>Sign Out</a>
        </Dropdown>
      </div>
    ) : (
      <Link className='a2' to={routes.authorize}>Sign In</Link>
    )}
  </div>
)

Header.propTypes = {
  className: PropTypes.string,
  authUser: PropTypes.object,
  handleDropdown: PropTypes.func,
  handleSignOut: PropTypes.func,
  closeDropdown: PropTypes.func
}

const HeaderEnhancer = compose(
  withDropdown,
  withRouter,
  withConsumer('app'),
  withHandlers({
    handleSignOut: ({ closeDropdown, authUser, history }) => () =>
      authUser.firebase.signOut().then(() => history.push(routes.index))
  })
)(Header)

const HeaderStyled = styled(HeaderEnhancer)`
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndexLayers.header};
  position: fixed;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.sizes.header};
  line-height: ${({ theme }) => theme.sizes.header};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 15, 0, theme.colors.black)}
  ${({ theme }) => theme.generators.gradient('#1f2730', '#27303c')}

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    padding: .5rem 1rem;
    border: 2px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    ${({ theme }) => theme.generators.transition(200, 'ease-out')};
    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLight1};
    }
  }

  ${Dropdown} {
    text-align: right;
  }

  .wrapper {
    position: relative;
  }

  .mdi-icon {
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    height: calc(${({ theme }) => theme.sizes.header} - 1rem);
    width: calc(${({ theme }) => theme.sizes.header} - 1rem);
    padding: 0.3rem;
    margin: 0 0.5rem;
    border-radius: 50%;
    box-sizing: border-box;
  }
`

export default HeaderStyled
