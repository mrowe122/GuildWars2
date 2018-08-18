/* istanbul ignore file */
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

const { Provider, Consumer } = createContext({
  item: null
})

export const TooltipConsumer = Consumer

export const Tooltip = ({ className, children, item }) => (
  <Provider value={item}>
    <div className={className}>{children}</div>
  </Provider>
)

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  item: PropTypes.object
}

const left = ({ theme }) => css`
  top: -50%;
  right: 150%;
  min-height: 100px;
  &:before {
    top: 35px;
    right: -15px;
    border-left: 15px solid ${theme.colors.gray1};
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
`

const right = ({ theme }) => css`
  top: -50%;
  left: 150%;
  min-height: 100px;
  &:before {
    top: 35px;
    left: -15px;
    border-right: 15px solid ${theme.colors.gray1};
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }
`

const top = ({ theme }) => css`
  left: 50%;
  bottom: 150%;
  transform: translateX(-50%);
  &:before {
    left: 50%;
    transform: translateX(-50%);
    bottom: -15px;
    border-top: 15px solid ${theme.colors.gray1};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }
`

const bottom = ({ theme }) => css`
  left: 50%;
  top: 150%;
  transform: translateX(-50%);
  &:before {
    left: 50%;
    transform: translateX(-50%);
    top: -15px;
    border-bottom: 15px solid ${theme.colors.gray1};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }
`

const TooltipStyled = styled(Tooltip)`
  width: 250px;
  padding: 0.7rem;
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
  }

  ${({ position = 'right' }) => {
    switch (position) {
      case 'top':
        return top
      case 'right':
        return right
      case 'left':
        return left
      case 'bottom':
        return bottom
    }
  }};

  ${({ customClass }) => customClass};
`

export default TooltipStyled
