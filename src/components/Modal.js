import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import CloseIcon from 'mdi-react/CloseIcon'

import backgroundModal from 'media/images/small_modal.gif'

const sizeMap = {
  auto: 'auto',
  xs: '20rem',
  sm: '25rem',
  md: '30rem',
  lg: '40rem'
}

const Content = styled.div`
  padding: 2rem;
  position: relative;
  margin-bottom: 5rem;
  border-radius: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${backgroundModal});

  .closeIcon {
    cursor: pointer;
    top: 10px;
    right: 10px;
    position: absolute;
  }
`

const Modal = ({ className, contentClass, children, showModal, closeModal }) =>
  showModal &&
  ReactDOM.createPortal(
    <div className={className}>
      <Content styles={contentClass}>
        {closeModal && <CloseIcon onClick={closeModal} className="closeIcon" />}
        {children}
      </Content>
    </div>,
    document.getElementById('modal')
  )

Modal.propTypes = {
  className: PropTypes.string,
  contentClass: PropTypes.string,
  children: PropTypes.node,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func
}

export default styled(Modal)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndexLayers.modal};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.modalOverlay};
  animation: ${({ theme }) => theme.animations.fadeIn} 500ms ease;

  ${Content} {
    width: ${({ size = 'md' }) => sizeMap[size]};
    animation: ${({ theme }) => theme.animations.scaleUp} 500ms ease;
    ${({ theme }) => theme.generators.boxShadow(0, 0, 40, -5, 'rgba(0, 0, 0, 1)')};
  }
`
