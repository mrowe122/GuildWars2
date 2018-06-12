import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { compose } from 'lodash/fp'
import { Modal } from 'components'

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

const CharacterSelectModal = ({ className, closeModal, allChars, modalSelectChar }) => (
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

CharacterSelectModal.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  allChars: PropTypes.array,
  modalSelectChar: PropTypes.func
}

export default styled(CharacterSelectModal)`${ModalStyling}`
