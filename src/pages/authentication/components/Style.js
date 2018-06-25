import { css } from 'styled-components'
import { Input } from 'elements'

export default css`
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 1.5rem;
  }

  ${Input} {
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primaryLight1};
    display: block;
    text-align: right;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
    margin-bottom: 1rem;
  }

  .lockIcon {
    padding: 1rem;
    box-sizing: initial;
    border-radius: 50%;
    margin-bottom: 2rem;
    fill: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
  }
`
