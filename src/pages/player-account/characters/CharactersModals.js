import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers, withHandlers } from 'recompose'
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

const CharacterSelectModalTemplate = ({ className, closeModal, allChars, modalSelectChar }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    <h3>Select Your Character</h3>
    {
      allChars.length ? allChars.map(char => (
        <div key={char}>
          <a onClick={compose(closeModal, modalSelectChar)}>{char}</a>
        </div>
      )) : (
        <a>You have not created any characters yet</a>
      )
    }
  </Modal>
)

CharacterSelectModalTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  allChars: PropTypes.array,
  modalSelectChar: PropTypes.func
}

const CharacterSelectModal = styled(CharacterSelectModalTemplate)`${ModalStyling}`

const ErrorCharacterModalTemplate = ({ className, closeModal, setKey, submit, errorMessage, apiKey, keyLoading }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    <h3>Error</h3>
    <p className='p1'>
      The key you provided does not allow us to access your character informtation.<br />
      Use a different key with character access in order to use this functionality.
    </p>
    <input onChange={setKey} placeholder='API key'/>
    { keyLoading ? <Spinner fadeIn='none' name='three-bounce' /> : <button type='submit' onClick={submit} disabled={!apiKey}>Submit</button> }
    { errorMessage && (<p>{errorMessage}</p>)}
  </Modal>
)

ErrorCharacterModalTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  setKey: PropTypes.func,
  submit: PropTypes.func,
  errorMessage: PropTypes.string
}

const ErrorCharacterModal = compose(
  withStateHandlers(
    () => ({
      apiKey: null,
      errorMessage: null,
      keyLoading: null
    }),
    {
      setKey: () => e => ({ apiKey: e.target.value }),
      setStates: () => states => states
    }
  ),
  withHandlers({
    submit: ({ apiKey, setStates }) => () => {
      setStates({ errorMessage: null, keyLoading: true })
      fetch('api/authenticate', {
        method: 'POST',
        body: JSON.stringify({apiKey: apiKey}),
        headers: { 'content-type': 'application/json' }
      }).then(res => {
        if (res.ok) {
          return Promise.resolve()
        } else {
          if (res.status === 403) {
            throw 'API Key is invalid'
          }
        }
      }).then(() => {
        location.reload()
      }).catch(err => {
        setStates({ errorMessage: err, keyLoading: false })
      })
    }
  })
)(styled(ErrorCharacterModalTemplate)`
  ${ModalStyling}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p.p1 {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    margin-bottom: 1rem;
  }
  button {
    display: block;
    margin-bottom: 1rem;
  }

  .sk-spinner { color: ${({ theme }) => theme.colors.white}; }
`)

const UnauthorizedKeyTemplate = ({ className, closeModal, setKey, submit, errorMessage, apiKey, keyLoading }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    <h3>Add your API key</h3>
    <input onChange={setKey} placeholder='API key'/>
    { keyLoading ? <Spinner fadeIn='none' name='three-bounce' /> : <button type='submit' onClick={submit} disabled={!apiKey}>Submit</button> }
    { errorMessage && (<p>{errorMessage}</p>)}
  </Modal>
)

UnauthorizedKeyTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  setKey: PropTypes.func,
  submit: PropTypes.func,
  errorMessage: PropTypes.string
}

const UnauthorizedKey = compose(
  withStateHandlers(
    () => ({
      apiKey: null,
      errorMessage: null,
      keyLoading: null
    }),
    {
      setKey: () => e => ({ apiKey: e.target.value }),
      setStates: () => states => states
    }
  ),
  withHandlers({
    submit: ({ apiKey, setStates }) => () => {
      setStates({ errorMessage: null, keyLoading: true })
      fetch('api/authenticate', {
        method: 'POST',
        body: JSON.stringify({apiKey: apiKey}),
        headers: { 'content-type': 'application/json' }
      }).then(res => {
        if (res.ok) {
          return Promise.resolve()
        } else {
          if (res.status === 403) {
            throw 'API Key is invalid'
          }
        }
      }).then(() => {
        location.reload()
      }).catch(err => {
        setStates({ errorMessage: err, keyLoading: false })
      })
    }
  })
)(styled(UnauthorizedKeyTemplate)`
  ${ModalStyling}

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    width: 100%;
    margin-bottom: 1rem;
  }
  button {
    display: block;
    margin-bottom: 1rem;
  }

  .sk-spinner { color: ${({ theme }) => theme.colors.white}; }
`)

export {
  CharacterSelectModal,
  ErrorCharacterModal,
  UnauthorizedKey
}
