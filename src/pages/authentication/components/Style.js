import { css } from 'react-emotion'
import { Input } from 'elements'

export default ({ theme }) => css`
  text-align: center;

  h2 {
    color: ${theme.colors.white};
    margin-bottom: 1.5rem;
  }

  ${Input} {
    margin-bottom: 1rem;
  }

  a {
    color: ${theme.colors.primaryLight1};
    display: block;
    text-align: right;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  .error {
    color: ${theme.colors.error};
    margin-bottom: 1rem;
  }

  .lockIcon {
    padding: 1rem;
    box-sizing: initial;
    border-radius: 50%;
    margin-bottom: 2rem;
    fill: ${theme.colors.primary};
    background-color: ${theme.colors.white};
  }
`
