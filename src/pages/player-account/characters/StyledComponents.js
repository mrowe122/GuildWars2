import styled, { css } from 'styled-components'

export const sideNavClasses = css`
  margin-left: ${({ theme }) => theme.sizes.pivotBar};
  & > h2 {
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 1rem;
  } 

  a {
    color: ${({ theme }) => theme.colors.gray1};
    cursor: pointer;
    max-width: 100%;
    margin: .5rem 0;
    padding: 0 .2rem;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ theme }) => theme.generators.transition(150, 'linear')};
    ${({ theme }) => theme.generators.textNoSelect};
    &[active='1'], &:hover { color: ${({ theme }) => theme.colors.primaryLight1}; }
  }
`

export const contentClasses = css`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => `
    margin-left: calc(${theme.sizes.sideNav} + ${theme.sizes.pivotBar});
  `}

  .middle-xs {
    margin-bottom: 1rem;
    img {
      width: 100%;
      ${({ theme }) => theme.generators.boxShadow(0, 0, 20, -3, '#000')}
    }
  }

  .gw-c1 {
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 { margin-bottom: .7rem; }
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
  ${({ theme }) => theme.generators.boxShadow(0, 0, 20, -3, '#000')}

  * { z-index: 5; }

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryLight1};
    ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  }

  .emblem {
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 0;
    opacity: 0.5;
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
  }  
`
