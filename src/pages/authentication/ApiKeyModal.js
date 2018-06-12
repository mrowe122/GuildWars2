import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers, withHandlers } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import { Modal } from 'components'
import Spinner from 'react-spinkit'

import backgroundModal from 'media/images/small_modal.gif'

const ModalStyling = css`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${backgroundModal});
  ${({ theme }) => theme.generators.boxShadow(0, 0, 70, -5, 'rgba(0, 0, 0, 1)')}

  h3 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.generators.textShadow(0, 2, 10, 'rgba(0,0,0,1)')};
  }

  a {
    cursor: pointer;
    display: inline-block;
    margin-bottom: .8rem;
    ${({ theme }) => theme.generators.transition(150, 'linear')};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight1};
      ${({ theme }) => theme.generators.textShadow(0, 2, 10, 'rgba(0,0,0,1)')};
    }
  }
`

const ApiKeyModalTemplate = ({ className, closeModal, api, handleChange, submit, errorStatus, keyLoading }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    {
      errorStatus === 403 && (
        <Fragment>
          <h3>Error</h3>
          <p className='p1'>
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
    <input onChange={handleChange} placeholder='API key' />
    { keyLoading ? <Spinner fadeIn='none' name='three-bounce' /> : <button type='submit' onClick={submit} disabled={!api}>Submit</button> }
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
  ${ModalStyling}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p.p1, input, button { margin-bottom: 1rem; }
  input {
    width: 100%;
    text-align: center;
  }

  .sk-spinner { color: ${({ theme }) => theme.colors.white}; }
`

export const enhancer = compose(
  withStateHandlers(
    () => ({ api: null }),
    { handleChange: () => e => ({ api: e.target.value }) }
  ),
  fetchHoc.post(`api/authenticate`, {
    name: 'authenticate',
    props: ({ loading }) => ({ keyLoading: loading })
  }),
  withHandlers({
    submit: ({ api, authenticate, setKey }) => () => authenticate({ apiKey: api }).then(res => {
      if (res) {
        localStorage.setItem('apiKey', res)
        setKey(res)
      }
    })
  })
)

export default enhancer(ApiKeyModal)
