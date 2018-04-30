import { keyframes } from 'styled-components'

const colors = {
  primary: '#AC0765',
  primaryHover: '#7E0248',
  primaryDark: '#3E0023',
  white: '#FFFFFF',
  black: '#000000',
  gray1: '#8B8B8B',
  gray2: '#6A6A6A',
  gray3: '#494949',
  gray4: '#3C3C3C',
  gray5: '#2F2F2F',
  modalOverlay: 'rgba(75, 75, 75, 0.7)',
  loadingOverlay: 'rgba(100,100, 100, 0.5)'
}

const sizes = {
  header: '65px',
  sideNav: '13rem'
}

const generators = {
  boxShadow: (x, y, blur, spread, color) => `
    box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
    -moz-box-shadow:${x}px ${y}px ${blur}px ${spread}px ${color};
    -webkit-box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
  `
}

const animations = {
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  scaleUp: keyframes`
    from { transform: scale(0); }
    to { transform: scale(1); }
  `
}

const zIndexLayers = {
  header: 90,
  footer: 90,
  modal: 100,
  statsContent: 5
}

export default {
  colors,
  sizes,
  generators,
  animations,
  zIndexLayers
}
