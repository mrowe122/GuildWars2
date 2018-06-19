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

const CreateAccountTemplate = ({ className, closeModal, handleChange, handleCreate, valid, createLoading, showLogin }) => (
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
    <Input
      name='confirmPassword'
      type='password'
      placeholder='Confirm Password'
      onChange={handleChange}
      icon={<LockOutlineIcon />} />
    <a onClick={showLogin} className='a1'>Already have an account?</a>
    <Button type='submit' onClick={handleCreate} loading={createLoading} disabled={!valid}>Create</Button>
  </Modal>
)

CreateAccountTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  handleChange: PropTypes.func,
  handleCreate: PropTypes.func,
  valid: PropTypes.bool,
  createLoading: PropTypes.bool,
  showLogin: PropTypes.func
}

export const CreateAccount = styled(CreateAccountTemplate)`
  ${modalStyle}
`

export const enhancer = compose(
  withModal,
  withStateHandlers(
    () => ({
      username: '',
      password: '',
      confirmPassword: ''
    }),
    {
      handleChange: () => e => ({ [e.target.name]: e.target.value })
    }
  ),
  fetchHocPost(`api/authenticate/create`, {
    name: 'createAccount',
    props: ({ loading }) => ({ createLoading: loading })
  }),
  withHandlers({
    handleCreate: ({ username, password, createAccount, showApikey }) => () => {
      createAccount({ username, password }).then(res => {
        localStorage.setItem('session', res)
        showApikey()
      })
    }
  }),
  withProps(({ username, password, confirmPassword, loggingIn }) => ({
    valid: !!(username && password) && (password === confirmPassword)
  }))
)

export default enhancer(CreateAccount)
