import { keyframes } from 'styled-components'

const colors = {
  primary: '#9B0000',
  primaryLight1: '#C21E1E',
  primaryLight2: '#E33939',
  primaryLight3: '#FF7C7C',
  primaryDark1: '#730909',
  primaryDark2: '#550E0E',
  primaryDark3: '#361212',
  white: '#FFFFFF',
  black: '#000000',
  gray1: '#AEAEAE',
  gray2: '#7E7E7E',
  gray3: '#5E5E5E',
  gray4: '#474747',
  gray5: '#323232',
  loadingOverlay: 'rgba(0, 0, 0, 0.6)',
  modalOverlay: 'rgba(100, 100, 100, 0.5)',
  tooltip: 'rgba(50, 50, 50, 0.8)'
}

const sizes = {
  header: '4rem',
  sideNav: '12rem'
}

const generators = {
  boxShadow: (x, y, blur, spread, color) => `
    box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
    -moz-box-shadow:${x}px ${y}px ${blur}px ${spread}px ${color};
    -webkit-box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
  `,
  textShadow: (y, x, blur, color) => `
    text-shadow: ${y}px ${x}px ${blur}px ${color}, ${y}px ${x}px ${blur}px ${color};
  `,
  textNoSelect: `
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
  header: 95,
  footer: 95,
  modal: 90,
  modalOverlay: 5,
  tooltip: 100
}

export default {
  colors,
  sizes,
  generators,
  animations,
  zIndexLayers
}
