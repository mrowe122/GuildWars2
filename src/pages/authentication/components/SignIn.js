import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStateHandlers, withHandlers, withProps, branch, renderComponent } from 'recompose'
import { compose } from 'lodash/fp'
import routes from 'routes'
import { withAuthentication } from 'providers/Authenticated'
import { withModal, Modal } from 'components'
import { Button, Input } from 'elements'
import modalStyle from './Style'

import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'
import LockOutlineIcon from 'mdi-react/LockOutlineIcon'
import LockIcon from 'mdi-react/LockIcon'

const SignInTemplate = ({
  className, closeModal, handleChange, handleSignIn, valid, loading, showCreate, error
}) => (
  <Modal size='sm' contentClass={className} showModal hideTransition hideClose closeModal={closeModal}>
    <LockIcon size={36} className='lockIcon' />
    {error && <p className='error'>{error}</p>}
    <Input
      name='email'
      placeholder='Email'
      onChange={handleChange}
      icon={<AccountOutlineIcon />} />
    <Input
      name='password'
      type='password'
      placeholder='Password'
      onChange={handleChange}
      icon={<LockOutlineIcon />} />
    <a onClick={showCreate} className='a1'>Create account</a>
    <Button type='submit' onClick={handleSignIn} loading={loading} disabled={!valid}>Sign In</Button>
  </Modal>
)

SignInTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  handleChange: PropTypes.func,
  handleSignIn: PropTypes.func,
  loading: PropTypes.bool,
  valid: PropTypes.bool,
  showCreate: PropTypes.func,
  error: PropTypes.string
}

export const SignIn = styled(SignInTemplate)`
  ${modalStyle}
`

export const enhancer = compose(
  withModal,
  withAuthentication,
  branch(
    ({ authUser }) => authUser.token,
    renderComponent(routes.redirect(routes.account.characters))
  ),
  withStateHandlers(
    () => ({
      email: '',
      password: '',
      error: null,
      loading: false
    }),
    {
      handleChange: () => e => ({ [e.target.name]: e.target.value }),
      handleError: () => error => ({ error, loading: false }),
      initSignIn: () => () => ({ error: null, loading: true })
    }
  ),
  withHandlers({
    handleSignIn: ({ email, password, initSignIn, handleError, authUser }) => () => {
      initSignIn()
      authUser.firebase.signInWithEmailAndPassword(email, password)
        .catch(error => handleError(error.message))
    }
  }),
  withProps(({ email, password }) => ({
    valid: !!(email && password)
  }))
)

export default enhancer(SignIn)
