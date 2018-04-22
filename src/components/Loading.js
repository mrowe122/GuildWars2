import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LoadingTemplate = ({ className }) => (
  <div className={className} />
)

LoadingTemplate.propTypes = {
  className: PropTypes.string
}

const Loading = styled(LoadingTemplate)``

export default Loading
