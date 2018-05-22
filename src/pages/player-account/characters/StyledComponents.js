import styled from 'styled-components'

export const BannerText = styled.div`
  position: relative;
  ${({ theme }) => theme.generators.boxShadow(0, 0, 30, -7, '#000')}

  & > div {
    top: 0;
    position: absolute;
    max-height: 100%;
    padding: 1rem 2rem;
    box-sizing: border-box;
    border-bottom-right-radius: 50px;
    background-color: ${({ theme }) => theme.colors.bannerText};
  }
`

export const Bubble = styled.div`
  text-align: center;
  width: 200px;
  margin: 2rem 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 20px;
  position: relative;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.dataBubble};

  * { z-index: 5; }

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primaryLight2};
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