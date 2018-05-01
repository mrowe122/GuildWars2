import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { Modal } from 'components'

import backgroundModal from 'media/images/small_modal.gif'

const CharacterSelectModalTemplate = ({ className, closeModal, allChars, selectChar }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    <h3>Select Your Character</h3>
    {
      allChars.map(char => (
        <div key={char}>
          <a onClick={compose(closeModal, selectChar)}>{char}</a>
        </div>
      ))
    }
  </Modal>
)

CharacterSelectModalTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  allChars: PropTypes.array,
  selectChar: PropTypes.func
}

const CharacterSelectModal = styled(CharacterSelectModalTemplate)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.colors.primaryDark2};
  background-image: url(${backgroundModal});
  ${({ theme }) => theme.generators.boxShadow(0, 0, 70, -5, 'rgba(0, 0, 0, 1)')}

  h3 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primaryLight2};
    ${({ theme }) => theme.generators.textShadow(0, 2, 10, 'rgba(0,0,0,1)')};
  }

  a {
    cursor: pointer;
    display: inline-block;
    margin-bottom: .8rem;
    ${({ theme }) => theme.generators.transition(150, 'linear')};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight3};
      ${({ theme }) => theme.generators.textShadow(0, 2, 10, 'rgba(0,0,0,1)')};
    }
  }
`

export default CharacterSelectModal
