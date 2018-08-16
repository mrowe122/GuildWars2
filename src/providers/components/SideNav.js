import styled from 'react-emotion'

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 1.5rem 1.5rem 8rem;
  position: fixed;
  overflow: auto;
  box-sizing: border-box;
  top: ${({ theme }) => theme.sizes.header};
  left: 0;
  background-color: ${({ theme }) => theme.colors.loadingOverlay};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primary)};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};

  & > h2 {
    margin-bottom: 2rem;
  }

  a {
    color: ${({ theme }) => theme.colors.gray1};
    cursor: pointer;
    max-width: 100%;
    margin: 1.5rem 0;
    padding: 0 0.2rem;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({ theme }) => theme.generators.transition(150, 'linear')};
    ${({ theme }) => theme.generators.textNoSelect};
    &[active='1'],
    &.active,
    &:hover {
      color: ${({ theme }) => theme.colors.primaryLight1};
    }
  }

  ${({ styles }) => styles};
`

export default SideNav
