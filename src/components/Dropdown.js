import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { compose } from 'lodash/fp'
import { withStateHandlers, branch, renderNothing } from 'recompose'
import { withProvider, withConsumer } from 'context-hoc'
import { withOutsideClick } from 'outside-click-hoc'

export const Dropdown = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
)

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export const withDropdown = compose(
  withStateHandlers(({ initial = false }) => ({ showDropdown: initial }), {
    handleDropdown: ({ showDropdown }) => () => ({ showDropdown: !showDropdown }),
    closeDropdown: () => () => ({ showDropdown: false })
  }),
  withProvider('dropdown', ({ showDropdown, handleDropdown, closeDropdown }) => ({
    showDropdown,
    handleDropdown,
    closeDropdown
  }))
)

const DropdownEnhancer = compose(
  withConsumer('dropdown'),
  branch(({ showDropdown }) => !showDropdown, renderNothing),
  withOutsideClick(({ closeDropdown }) => closeDropdown)
)(Dropdown)

const DropdownStyled = styled(DropdownEnhancer)`
  top: calc(100% + 0.4rem);
  left: ${({ dropdown }) => dropdown || '50%'};
  transform: translateX(-50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 0.35rem 0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.gray4};

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.colors.gray4};
    border-right: 10px solid transparent;
    top: -8px;
    left: ${({ arrow }) => arrow || '50%'};
    transform: translateX(-50%);
  }
`

export default DropdownStyled
