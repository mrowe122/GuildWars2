import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TooltipTemplate = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

TooltipTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const Tooltip = styled(TooltipTemplate)`
  color: ${({ theme }) => theme.colors.white};
  width: 100px;
  height: 100px;
  margin: 0 1rem;
  top: -50%;
  left: 100%;
  position: absolute;
  z-index: ${({ theme }) => theme.zIndexLayers.tooltip};
  background-color: ${({ theme }) => theme.colors.tooltip};
`

export default Tooltip
