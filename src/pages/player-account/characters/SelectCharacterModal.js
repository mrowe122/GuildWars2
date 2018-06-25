import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withHandlers } from 'recompose'
import { Modal } from 'components'

const CharacterSelectModalTemplate = ({ className, allChars, handleClick }) => (
  <Modal size='xs' contentClass={className} showModal hideClose>
    <h3>Select Your Character</h3>
    {
      allChars.length ? allChars.map(char => (
        <div key={char}>
          <a onClick={handleClick}>{char}</a>
        </div>
      )) : (
        <a>You have not created any characters yet</a>
      )
    }
  </Modal>
)

CharacterSelectModalTemplate.propTypes = {
  className: PropTypes.string,
  allChars: PropTypes.array,
  handleClick: PropTypes.func
}

const CharacterSelectModal = styled(CharacterSelectModalTemplate)`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;

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

const enhance = compose(
  withHandlers({
    handleClick: ({ setChar }) => e => setChar(e.target.innerText)
  })
)

export default enhance(CharacterSelectModal)
