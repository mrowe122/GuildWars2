/* istanbul ignore file */
import styled, { css } from 'react-emotion'

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
    &[active='1'],
    &:hover {
      color: ${theme.colors.primaryLight1};
    }
  }
`

export const contentCSS = ({ theme }) => css`
  color: ${theme.colors.white};
  margin-left: ${theme.sizes.sideNav};

  .middle-xs {
    position: relative;
    margin-bottom: 1rem;
    img {
      width: 100%;
      ${theme.generators.boxShadow(0, 0, 20, -3, '#000')};
    }
  }

  .gw-c1 {
    display: flex;
    align-items: center;
    flex-direction: column;

    h3 {
      margin-bottom: 0.7rem;
    }
  }

  .special {
    width: 100%;
    max-width: 645px;
    height: 135px;
    margin: 2rem 0;
    background: no-repeat left bottom;
  }

  .bag {
    margin-bottom: 1rem;
    img {
      width: 50px;
      height: 50px;
      padding: 0.1rem;
      border: 1px solid ${theme.colors.gray3};
    }
  }
`

export const Bubble = styled.div`
  text-align: center;
  width: 200px;
  margin: 1rem 0.3rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 20px;
  position: relative;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primaryDark1};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 20, -3, '#000')} * {
    z-index: 5;
  }

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryLight1};
    ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  }

  p {
    align-self: stretch;
  }

  .emblem {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0.5;
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    ${({ guild }) =>
      guild && `background-image: url(https://guilds.gw2w2w.com/guilds/${guild.replace(/\s+/g, '-')}/100.svg)`};
  }
`

export const Gradient = styled.div`
  width: 45%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.generators.gradient('#000', 'rgba(0,0,0,0)', 135)} h2 {
    color: ${({ theme }) => theme.colors.primaryLight1};
    margin-bottom: 0.5rem;
    ${({ theme }) => theme.generators.textShadow(0, 0, 15, 'rgba(0,0,0,1)')};
  }
`

export const Specialization = styled.div`
  width: 100%;
  max-width: 645px;
  height: 135px;
  margin: 2rem 0;
  background: url(${({ img }) => img}) no-repeat left bottom;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  h3 {
    margin-right: 2rem;
    ${({ theme }) => theme.generators.textShadow(0, 0, 7, 'rgba(0,0,0,1)')};
  }

  span {
    display: flex;
    flex-direction: column;
    margin-right: 2.4rem;

    img {
      width: 38px;
      height: 38px;
      margin-bottom: 0.5rem;
      ${({ theme }) => theme.generators.boxShadow(0, 0, 8, 0, theme.colors.white)};
      &[disabled] {
        box-shadow: none;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`
