import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

const FullPageLoaderTemplate = ({ className }) => (
  <div className={className}>
    <Spinner name='three-bounce' fadeIn='none' />
  </div>
)

FullPageLoaderTemplate.propTypes = {
  className: PropTypes.string
}

const FullPageLoader = styled(FullPageLoaderTemplate)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndexLayers.modalOverlay};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.loadingOverlay};

  .sk-spinner { color: ${({ theme }) => theme.colors.primaryLight1}; }
`

export default FullPageLoader
