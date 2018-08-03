/* istanbul ignore file */
import { css } from 'react-emotion'

export const ContentCSS = ({ theme }) => css`
  margin-left: ${theme.sizes.sideNav};
`

export const sideNavCSS = ({ theme }) => css`
  & > h2 {
    color: ${theme.colors.white};
    margin-bottom: 2rem;
  }

  a {
    color: ${theme.colors.gray1};
    cursor: pointer;
    max-width: 100%;
    margin: 1rem 0;
    padding: 0 0.2rem;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    ${theme.generators.transition(150, 'linear')};
    ${theme.generators.textNoSelect};
    &.active,
    &:hover {
      color: ${theme.colors.primaryLight1};
    }
  }
`
