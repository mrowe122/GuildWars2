import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers, withHandlers, branch, renderComponent } from 'recompose'
import { fetchHoc } from 'utils/cachedFetch'
import { Modal } from 'components'
import Spinner from 'react-spinkit'
import { Redirect } from 'react-router-dom'
import routes from 'utils/routes'

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
  <Modal size='sm' contentClass={className} showModal hideClose>
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

const ErrorCharacterModalTemplate = ({ className, closeModal, apiKey, setKey, submit, errorStatus, keyLoading }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    {
      errorStatus === 403 && (
        <Fragment>
          <h3>Error</h3>
          <p className='p1'>
            The key you provided is either invalid or does not permit character access<br />
            Use a different key that grants character permissions.
          </p>
        </Fragment>
      )
    }
    {
      errorStatus === 401 && (
        <h3>Add an API key</h3>
      )
    }
    {
      !errorStatus && keyLoading && (
        <h3>Validating your API key</h3>
      )
    }
    <input onChange={setKey} placeholder='API key' />
    { keyLoading ? <Spinner fadeIn='none' name='three-bounce' /> : <button type='submit' onClick={submit} disabled={!apiKey}>Submit</button> }
  </Modal>
)

ErrorCharacterModalTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  apiKey: PropTypes.string,
  setKey: PropTypes.func,
  submit: PropTypes.func,
  errorStatus: PropTypes.number,
  keyLoading: PropTypes.bool
}

const ErrorCharacterModal = styled(ErrorCharacterModalTemplate)`
  ${ModalStyling}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p.p1, input, button { margin-bottom: 1rem; }
  input { width: 100%; }

  .sk-spinner { color: ${({ theme }) => theme.colors.white}; }
`

// TODO: not final implementation. Going to move API key logic to /account route
// const AccountRedirect = () => <Redirect to={routes.account.index} />

// const enhance = compose(
//   withStateHandlers(
//     () => ({ apiKey: null }),
//     { setKey: () => e => ({ apiKey: e.target.value }) }
//   ),
//   fetchHoc.post(`api/authenticate`, {
//     name: 'authenticate',
//     props: ({ loading }) => ({ keyLoading: loading })
//   }),
//   withHandlers({
//     submit: ({ apiKey, authenticate, ...rest }) => () => authenticate({ apiKey })
//   }),
//   branch(
//     ({ errorStatus, keyLoading }) => !errorStatus && !keyLoading,
//     renderComponent(AccountRedirect)
//   )
// )

export {
  CharacterSelectModal,
  ErrorCharacterModal
}
