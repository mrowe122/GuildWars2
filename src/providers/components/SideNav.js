import styled from 'react-emotion'

const SideNav = styled.div`
  height: 100%;
  width: ${({ theme }) => theme.sizes.sideNav};
  padding: 2rem;
  position: fixed;
  box-sizing: border-box;
  top: ${({ theme }) => theme.sizes.header};
  left: 0;
  background-color: ${({ theme }) => theme.colors.loadingOverlay};
  ${({ theme }) => theme.generators.boxShadow(0, 0, 10, 3, theme.colors.primary)};
  ${({ theme }) => theme.generators.textShadow(0, 0, 5, 'rgba(0,0,0,1)')};
  ${({ styles }) => styles};
`

export default SideNav
