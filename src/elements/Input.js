import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const InputTemplate = ({ className, icon, ...props }) => (
  <div className={className}>
    {icon}
    <input {...props} />
  </div>
)

InputTemplate.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node
}

const Input = styled(InputTemplate)`
  width: 100%;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.white};
  
  input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: .8rem 0;
    margin-left: .7rem;
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
  }

  .mdi-icon {
    margin-left: .7rem;
  }
`

export default Input
