import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers, withHandlers } from 'recompose'
import { withAuthentication } from 'providers/Authenticated'
import { fetchHocPost } from 'utils/cachedFetch'
import { Modal } from 'components'
import { Button, Input } from 'elements'

import KeyIcon from 'mdi-react/KeyIcon'

const ApiKeyModalTemplate = ({ className, closeModal, api, handleChange, submit, errorStatus, keyLoading }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    {
      errorStatus === 403 && (
        <Fragment>
          <h3>Error</h3>
          <p className='error'>
            The key you provided is invalid
          </p>
        </Fragment>
      )
    }
    {
      !errorStatus && !keyLoading && (
        <h3>Add an API key</h3>
      )
    }
    {
      !errorStatus && keyLoading && (
        <h3>Validating your API key</h3>
      )
    }
    <Input onChange={handleChange} placeholder='API key' icon={<KeyIcon />} />
    <Button type='submit' onClick={submit} loading={keyLoading} disabled={!api}>Submit</Button>
  </Modal>
)

ApiKeyModalTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  api: PropTypes.string,
  handleChange: PropTypes.func,
  submit: PropTypes.func,
  errorStatus: PropTypes.number,
  keyLoading: PropTypes.bool
}

export const ApiKeyModal = styled(ApiKeyModalTemplate)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.generators.textShadow(0, 2, 10, 'rgba(0,0,0,1)')};
  }

  p.p1, ${Input} {
    margin-bottom: 2rem;
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 1rem;
  }
`

export const enhancer = compose(
  withAuthentication,
  withStateHandlers(
    () => ({ api: null }),
    { handleChange: () => e => ({ api: e.target.value }) }
  ),
  fetchHocPost(`api/tokeninfo`, {
    name: 'authenticate',
    props: ({ loading }) => ({ keyLoading: loading })
  }),
  withHandlers({
    submit: ({ api, authenticate, authUser, authComplete }) => () =>
      authenticate({ apiKey: api, token: authUser.token }).then(res => {
        if (res) {
          authComplete()
        }
      })
  })
)

export default enhancer(ApiKeyModal)
