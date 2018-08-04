import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose } from 'lodash/fp'
import { withFormik } from 'formik'
import { withConsumer } from 'context-hoc'
import { Modal } from 'components'
import { Button, Input } from 'elements'
import { validateEmail, validatePassword, validateConfirmPassword } from 'utils/validation'
import modalStyle from './style'

import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon'
import LockOutlineIcon from 'mdi-react/LockOutlineIcon'
import LockIcon from 'mdi-react/LockIcon'

const CreateAccount = ({
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
  showLogin
}) => (
  <Modal size="sm" styles={className} showModal>
    <LockIcon size={36} className="lockIcon" />
    {status && <p className="error">{status}</p>}
    <Input
      type="email"
      name="email"
      placeholder="Email"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
      icon={<AccountOutlineIcon />}
    />
    <Input
      type="password"
      name="password"
      placeholder="Password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.password && errors.password}
      icon={<LockOutlineIcon />}
    />
    <Input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.confirmPassword && errors.confirmPassword}
      icon={<LockOutlineIcon />}
    />
    <a onClick={showLogin} className="a1">
      Already have an account?
    </a>
    <Button type="submit" onClick={handleSubmit} loading={isSubmitting} disabled={!isValid}>
      Create Account
    </Button>
  </Modal>
)

CreateAccount.propTypes = {
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
  showLogin: PropTypes.func
}

const CreateAccountEnhancer = compose(
  withConsumer('app'),
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '', confirmPassword: '' }),
    validate: values => {
      const email = validateEmail(values.email)
      const password = validatePassword(values.password)
      const confirmPassword = validateConfirmPassword(values.password, values.confirmPassword)
      return {
        ...(email && { email }),
        ...(password && { password }),
        ...(confirmPassword && { confirmPassword })
      }
    },
    handleSubmit: ({ email, password }, { props, setSubmitting, setStatus }) => {
      setStatus(null)
      props.authUser.firebase
        .createUserWithEmailAndPassword(email, password)
        .then(props.showApikey)
        .catch(error => {
          if (error.code === 'auth/too-many-requests') {
            setStatus('Too many attempts to create an account, please try again later.')
          } else if (error.code === 'auth/web-storage-unsupported') {
            setStatus('Please enable web storage in order to sign into the website')
          }
          setSubmitting(false)
        })
    }
  })
)(CreateAccount)

export default styled(CreateAccountEnhancer)`
  ${modalStyle};
`
