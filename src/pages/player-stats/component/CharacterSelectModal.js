import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { Modal } from 'components'

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
  background-size: 30rem;
  background-color: ${({ theme }) => theme.colors.primaryDark2};
  background-image: url('media/images/small_modal.png');
  ${({ theme }) => theme.generators.boxShadow(0, 0, 70, -5, 'rgba(0, 0, 0, 1)')}

  h3 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primaryLight2};
  }

  a {
    cursor: pointer;
    display: inline-block;
    margin-bottom: .8rem;
    transition: all 150ms linear;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight2};
      transition: all 150ms linear;
    }
  }
`

export default CharacterSelectModal
