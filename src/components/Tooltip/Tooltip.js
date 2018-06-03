/* istanbul ignore file */
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const { Provider, Consumer } = createContext({
  item: null
})

export const TooltipConsumer = Consumer

const TooltipTemplate = ({ className, children, item }) => (
  <Provider value={item}>
    <div className={className}>
      {children}
    </div>
  </Provider>
)

TooltipTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  item: PropTypes.object
}

const Tooltip = styled(TooltipTemplate)`
  color: ${({ theme }) => theme.colors.white};
  min-height: 100px;
  width: 250px;
  padding: .7rem;
  margin: 0 1rem;
  top: -50%;
  ${({ position = 'right' }) => position === 'right' ? 'left: 120%' : 'right: 120%'};
  position: absolute;
  z-index: ${({ theme }) => theme.zIndexLayers.tooltip};
  background-color: ${({ theme }) => theme.colors.tooltip};
  border: 1px solid ${({ theme }) => theme.colors.gray1};

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    ${({ position = 'right', theme }) => position === 'right'
    ? `border-right: 15px solid ${theme.colors.gray1}; left: -15px;`
    : `border-left: 15px solid ${theme.colors.gray1}; right: -15px;`}
    top: 35px;
  }
`

export default Tooltip
