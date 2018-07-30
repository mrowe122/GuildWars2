import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose } from 'lodash/fp'
import { withFormik } from 'formik'
import { withConsumer } from 'context-hoc'
import { fetchHocPost } from 'utils/cachedFetch'
import { validateApiKey } from 'utils/validation'
import { Modal } from 'components'
import { Button, Input } from 'elements'
import modalStyle from './Style'

import KeyIcon from 'mdi-react/KeyIcon'

export const ApiKeyModal = ({
  className,
  values,
  handleChange,
  handleBlur,
  touched,
  isValid,
  handleSubmit,
  isSubmitting,
  errors,
  status
}) => (
  <Modal size="sm" contentClass={className} showModal>
    <KeyIcon size={36} className="accountKeyIcon" />
    <h3>Add an API key</h3>
    {status && <p className="error">{status}</p>}
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="apiKey"
        placeholder="API key"
        value={values.apiKey}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.apiKey && errors.apiKey}
        icon={<KeyIcon />}
      />
      <a href="https://account.arena.net/applications" target="_blank" rel="noopener noreferrer">
        Get an API Key
      </a>
      <Button type="submit" onClick={handleSubmit} loading={isSubmitting} disabled={!isValid}>
        Submit
      </Button>
    </form>
  </Modal>
)

ApiKeyModal.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  touched: PropTypes.object,
  isValid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  errors: PropTypes.object,
  status: PropTypes.string
}

const ApiKeyModalEnhancer = compose(
  withConsumer('app'),
  fetchHocPost(`api/tokeninfo`, {
    name: 'authenticate',
    props: ({ loading }) => ({ keyLoading: loading })
  }),
  withFormik({
    mapPropsToValues: () => ({ apiKey: '' }),
    validate: values => {
      const apiKey = validateApiKey(values.apiKey)
      return {
        ...(apiKey && { apiKey })
      }
    },
    handleSubmit: ({ apiKey }, { props, setSubmitting, setStatus }) => {
      setStatus(null)
      props.authenticate({ apiKey, token: props.authUser.token }).then(res => {
        setSubmitting(false)
        if (res === 403) {
          return setStatus('The key you provided is invalid')
        }
        props.authComplete()
      })
    }
  })
)(ApiKeyModal)

export default styled(ApiKeyModalEnhancer)`
  ${modalStyle};
`
