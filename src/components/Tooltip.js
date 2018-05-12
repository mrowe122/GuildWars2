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
  min-height: 100px;
  padding: .7rem;
  margin: 0 1rem;
  top: -50%;
  left: 120%;
  position: absolute;
  white-space: nowrap;
  z-index: ${({ theme }) => theme.zIndexLayers.tooltip};
  background-color: ${({ theme }) => theme.colors.tooltip};
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid ${({ theme }) => theme.colors.primary};
    left: -15px;
    top: 35px;
  }
`

export default Tooltip
