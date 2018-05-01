import { keyframes } from 'styled-components'

const colors = {
  primary: '#9B0000',
  primaryLight1: '#C21E1E',
  primaryLight2: '#E33939',
  primaryLight3: '#FF7C7C',
  primaryDark1: '#730909',
  primaryDark2: '#550e0e',
  primaryDark3: '#361212',
  white: '#FFFFFF',
  black: '#000000',
  gray1: '#8B8B8B',
  gray2: '#6A6A6A',
  gray3: '#494949',
  gray4: '#3C3C3C',
  gray5: '#2F2F2F',
  modalOverlay: 'rgba(100, 100, 100, 0.5)',
  loadingOverlay: 'rgba(175, 175, 175, 0.5)'
}

const sizes = {
  header: '65px',
  sideNav: '12rem'
}

const generators = {
  boxShadow: (x, y, blur, spread, color) => `
    box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
    -moz-box-shadow:${x}px ${y}px ${blur}px ${spread}px ${color};
    -webkit-box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
  `,
  textShadow: (y, x, blur, color) => `
    text-shadow: ${y}px ${x}px ${blur}px ${color};
  `,
  gradient: (top, bottom) => `
    background: ${top};
    background: -moz-linear-gradient(top, ${top} 0%, ${bottom} 100%);
    background: -webkit-linear-gradient(top, ${top} 0%,${bottom} 100%);
    background: linear-gradient(to bottom, ${top} 0%,${bottom} 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='${top}', endColorstr='${bottom}',GradientType=0);
  `,
  transition: (time, timeFunction) => `
    -webkit-transition: all ${time}ms ${timeFunction}; 
    -moz-transition: all ${time}ms ${timeFunction}; 
    -o-transition: all ${time}ms ${timeFunction}; 
    transition: all ${time}ms ${timeFunction};
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
