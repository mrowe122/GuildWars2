import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { branch, renderComponent } from 'recompose'
import { compose } from 'lodash/fp'
import { withFormik } from 'formik'
import { withConsumer } from 'context-hoc'
import routes from 'routes'
import { Modal } from 'components'
import { validateEmail, validatePassword } from 'utils/validation'
import { Button, Input } from 'elements'
import modalStyle from './style'

import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'
import LockOutlineIcon from 'mdi-react/LockOutlineIcon'
import LockIcon from 'mdi-react/LockIcon'

const SignIn = ({
  className,
  values,
  handleChange,
  handleBlur,
  touched,
  isValid,
  handleSubmit,
  isSubmitting,
  errors,
  status,
  showCreate
}) => (
  <Modal size='sm' styles={className} showModal>
    <LockIcon size={36} className='lockIcon' />
    {status && <p className='error'>{status}</p>}
    <form onSubmit={handleSubmit}>
      <Input
        type='email'
        name='email'
        placeholder='Email'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        icon={<AccountOutlineIcon />}
      />
      <Input
        type='password'
        name='password'
        placeholder='Password'
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && errors.password}
        icon={<LockOutlineIcon />}
      />
      <a onClick={showCreate} className='a1'>
        Create account
      </a>
      <Button type='submit' onClick={handleSubmit} loading={isSubmitting} disabled={!isValid}>
        Sign In
      </Button>
    </form>
  </Modal>
)

SignIn.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  touched: PropTypes.object,
  isValid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  errors: PropTypes.object,
  status: PropTypes.string,
  showCreate: PropTypes.func
}

const SignInEnhancer = compose(
  withConsumer('app'),
  branch(({ authUser }) => authUser.token, renderComponent(routes.redirect(routes.account.characters))),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    validate: values => {
      const email = validateEmail(values.email)
      const password = validatePassword(values.password)
      return {
        ...(email && { email }),
        ...(password && { password })
      }
    },
    handleSubmit: ({ email, password }, { props, setSubmitting, setStatus }) => {
      setStatus(null)
      props.authUser.firebase
        .signInWithEmailAndPassword(email, password)
        .then(props.authComplete)
        .catch(error => {
          if (error.code === 'auth/too-many-requests') {
            setStatus('Too many attempts to sign in, please try again later.')
          } else if (error.code === 'auth/web-storage-unsupported') {
            setStatus('Please enable web storage in order to sign into the website')
          } else {
            setStatus('Either email or password is incorrect')
          }
          setSubmitting(false)
        })
    }
  })
)(SignIn)

export default styled(SignInEnhancer)`
  ${modalStyle};
`
