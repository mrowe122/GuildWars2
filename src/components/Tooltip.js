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

  &:before {
    content: "";
    position: absolute;
    top: 50px;
    margin-top: -15px;
    left:-30px;
    border: solid 15px transparent;
    border-right-color: ${({ theme }) => theme.colors.tooltip};
    z-index: 1;
  }
`

export default Tooltip
