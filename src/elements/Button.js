import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Spinner from 'react-spinkit'

export const Button = ({ children, loading, ...props }) => (
  <button {...props}>
    <p>{children}</p>
    {loading && <Spinner name='three-bounce' color='white' fadeIn='none' />}
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool
}

const ButtonStyled = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  width: initial;
  position: relative;
  cursor: pointer;
  border: 0;
  border-radius: 3rem;
  outline: none;
  padding: 0.6rem 1rem;
  text-transform: uppercase;
  background-color: ${({ theme, background }) => theme.colors[background] || theme.colors.primaryLight1};

  ${({ loading }) =>
    loading &&
    `
    pointer-events: none;
    & > p {
      visibility: hidden;
    }
  `} .sk-spinner {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
`

export default ButtonStyled
