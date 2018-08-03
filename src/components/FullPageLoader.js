import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Spinner from 'react-spinkit'
import { compose } from 'lodash/fp'
import { lifecycle, branch, renderComponent } from 'recompose'

const FullPageLoader = ({ className }) => (
  <div className={className}>
    <Spinner name="three-bounce" fadeIn="none" />
  </div>
)

FullPageLoader.propTypes = {
  className: PropTypes.string
}

const FullPageLoaderEnhancer = compose(
  lifecycle({
    componentDidMount() {
      document.body.className = 'noScroll'
    },
    componentWillUnmount() {
      document.body.className = ''
    }
  })
)(FullPageLoader)

const FullPageLoaderStyled = styled(FullPageLoaderEnhancer)`
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

  .sk-spinner {
    color: ${({ theme }) => theme.colors.primaryLight1};
  }
`

export const withFullPageLoader = loading => compose(branch(loading, renderComponent(FullPageLoaderStyled)))

export default FullPageLoaderStyled
