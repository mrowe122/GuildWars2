import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { Modal } from 'components'

const CharacterSelectModalTemplate = ({ className, closeModal, allChars, selectChar }) => (
  <Modal size='sm' contentClass={className} showModal hideClose closeModal={closeModal}>
    Select Your Character
    { allChars.map(char => <p onClick={compose(closeModal, selectChar)} key={char}>{char}</p>) }
  </Modal>
)

CharacterSelectModalTemplate.propTypes = {
  className: PropTypes.string,
  closeModal: PropTypes.func,
  allChars: PropTypes.array,
  selectChar: PropTypes.func
}

const CharacterSelectModal = styled(CharacterSelectModalTemplate)`
`

export default CharacterSelectModal
