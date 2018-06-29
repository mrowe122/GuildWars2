/* istanbul ignore file */
import { css } from 'react-emotion'

export default ({ theme }) => css`
  text-align: center;

  h3 {
    color: ${theme.colors.white};
    margin-bottom: 1.5rem;
  }

  a {
    cursor: pointer;
    color: ${theme.colors.primaryLight1};
    margin-bottom: 1.5rem;
    float: right;
    display: inline-block;
  }

  button {
    clear: both;
    display: block;
    margin: 0 auto;
  }

  .error {
    color: ${theme.colors.error};
    margin-bottom: 1rem;
  }

  .lockIcon, .accountKeyIcon {
    padding: 1rem;
    box-sizing: initial;
    border-radius: 50%;
    margin-bottom: 2rem;
    fill: ${theme.colors.primary};
    background-color: ${theme.colors.white};
  }
`
