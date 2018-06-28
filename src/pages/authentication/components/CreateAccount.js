import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { withStateHandlers, withHandlers, withProps } from 'recompose'
import { compose } from 'lodash/fp'
import { withAuthentication } from 'providers/Authenticated'
import { Modal } from 'components'
import { Button, Input } from 'elements'
import modalStyle from './Style'

import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'
import LockOutlineIcon from 'mdi-react/LockOutlineIcon'
import LockIcon from 'mdi-react/LockIcon'

const CreateAccountTemplate = ({
  className, handleChange, handleCreate, valid, loading, showLogin, error
}) => (
  <Modal size='sm' contentClass={className} showModal hideTransition hideClose>
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
    <Input
      name='confirmPassword'
      type='password'
      placeholder='Confirm Password'
      onChange={handleChange}
      icon={<LockOutlineIcon />} />
    <a onClick={showLogin} className='a1'>Already have an account?</a>
    <Button type='submit' onClick={handleCreate} loading={loading} disabled={!valid}>Create Account</Button>
  </Modal>
)

CreateAccountTemplate.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func,
  handleCreate: PropTypes.func,
  valid: PropTypes.bool,
  loading: PropTypes.bool,
  showLogin: PropTypes.func,
  error: PropTypes.string
}

export const CreateAccount = styled(CreateAccountTemplate)`
  ${modalStyle};
`

export const enhancer = compose(
  withAuthentication,
  withStateHandlers(
    () => ({
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      loading: false
    }),
    {
      handleChange: () => e => ({ [e.target.name]: e.target.value }),
      handleError: () => error => ({ error, loading: false }),
      initCreate: () => () => ({ error: null, loading: true })
    }
  ),
  withHandlers({
    handleCreate: ({ email, password, initCreate, handleError, showApikey, authUser }) => () => {
      initCreate()
      authUser.firebase.createUserWithEmailAndPassword(email, password)
        .then(() => showApikey())
        .catch(error => handleError(error.message))
    }
  }),
  withProps(({ email, password, confirmPassword }) => ({
    valid: !!(email && password) && (password === confirmPassword)
  }))
)

export default enhancer(CreateAccount)
