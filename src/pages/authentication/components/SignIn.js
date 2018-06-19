import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStateHandlers, withHandlers, withProps } from 'recompose'
import { compose } from 'lodash/fp'
import { fetchHocPost } from 'utils/cachedFetch'
import { withModal, Modal } from 'components'
import { Button, Input } from 'elements'
import modalStyle from './Style'

import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'
import LockOutlineIcon from 'mdi-react/LockOutlineIcon'
import LockIcon from 'mdi-react/LockIcon'

const SignInTemplate = ({ className, closeModal, handleChange, handleLogin, loading, valid, showCreate }) => (
  <Modal size='sm' contentClass={className} showModal hideTransition hideClose closeModal={closeModal}>
    <LockIcon size={36} className='lockIcon' />
    <Input
      name='username'
      placeholder='Username'
      onChange={handleChange}
      icon={<AccountOutlineIcon />} />
    <Input
      name='password'
      type='password'
      placeholder='Password'
      onChange={handleChange}
      icon={<LockOutlineIcon />} />
    <a onClick={showCreate} className='a1'>Create account</a>
    <Button type='submit' onClick={handleLogin} loading={loading} disabled={!valid}>Sign In</Button>
  </Modal>
)

SignInTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  handleChange: PropTypes.func,
  handleLogin: PropTypes.func,
  loading: PropTypes.bool,
  valid: PropTypes.bool,
  showCreate: PropTypes.func
}

export const SignIn = styled(SignInTemplate)`
  ${modalStyle}
`

export const enhancer = compose(
  withModal,
  withStateHandlers(
    () => ({
      username: '',
      password: ''
    }),
    {
      handleChange: () => e => ({ [e.target.name]: e.target.value })
    }
  ),
  fetchHocPost(`api/authenticate`, {
    name: 'login'
  }),
  withHandlers({
    handleLogin: ({ username, password, login, userLoggedIn }) => () => {
      login({ username, password }).then(res => {
        const { sessionId, permissions } = JSON.parse(res)
        localStorage.setItem('permissions', JSON.stringify(permissions))
        localStorage.setItem('session', sessionId)
        userLoggedIn()
      })
    }
  }),
  withProps(({ username, password }) => ({
    valid: !!(username && password)
  }))
)

export default enhancer(SignIn)
