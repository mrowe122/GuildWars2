import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { setPropTypes } from 'recompose'
import CloseIcon from 'mdi-react/CloseIcon'

const sizeMap = {
  sm: '20rem',
  md: '30rem',
  lg: '40rem'
}

const Content = styled.div`
  padding: 1rem;
  position: relative;
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: white;
`

const ModalTemplate = ({ className, children, showModal, closeModal }) => (
  showModal ? (
    <div className={className}>
      <Content>
        <CloseIcon onClick={closeModal} className='closeIcon' />
        {children}
      </Content>
    </div>
  ) : ''
)

ModalTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func
}

const Modal = styled(ModalTemplate)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.alphaGray};
  animation: ${({ theme }) => theme.animations.fadeIn} 500ms ease;

  ${Content} {
    width: ${({ size = 'md' }) => sizeMap[size]};
    animation: ${({ theme }) => theme.animations.scaleUp} 500ms ease;
  }

  .closeIcon {
    cursor: pointer;
    top: 10px;
    right: 10px;
    z-index: 10;
    position: absolute;
  }
`

Modal.propTypes = { size: PropTypes.oneOf(['sm', 'md', 'lg']) }

export default compose(
  setPropTypes({
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
  })
)(Modal)
