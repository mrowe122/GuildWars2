import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

export const Input = ({ className, icon, error, ...props }) => (
  <div className={className}>
    {icon}
    <input {...props} />
    {error && <span className='p2'>{error}</span>}
  </div>
)

Input.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

const InputStyled = styled(Input)`
  width: 100%;
  margin-bottom: 1.7rem;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 5px;
  border: 1px solid transparent;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.white};

  ${({ theme, error }) =>
    error &&
    `
    background: rgba(100, 0, 0, .5);
    border: 1px solid ${theme.colors.error};
    border-bottom-right-radius: 0;
  `} input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0.8rem 0;
    margin-left: 0.7rem;
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
  }

  span {
    text-transform: uppercase;
    padding: 3px 9px;
    top: 100%;
    right: -1px;
    position: absolute;
    border-bottom-left-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.error};
    background-color: ${({ theme }) => theme.colors.error};
  }

  .mdi-icon {
    margin-left: 0.7rem;
  }
`

export default InputStyled
