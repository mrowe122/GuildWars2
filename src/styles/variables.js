import { keyframes } from 'react-emotion'

const colors = {
  primary: '#1d2730',
  primary2: '#25313a',
  primaryLight1: '#0090eb',
  primaryDark1: '#040E17',
  white: '#FFFFFF',
  black: '#000000',
  gray1: '#AEAEAE',
  gray2: '#7E7E7E',
  gray3: '#5E5E5E',
  gray4: '#474747',
  gray5: '#323232',
  error: '#fC3838',
  completed: '#28D21E',
  loadingOverlay: 'rgba(0, 0, 0, 0.6)',
  modalOverlay: 'rgba(100, 100, 100, 0.5)',
  tooltip: 'rgba(30, 30, 30, 0.9)'
}

const sizes = {
  header: '4rem',
  sideNav: '13rem',
  pivotBar: '4.2rem',
  pivotBarExpanded: '14rem'
}

const generators = {
  boxShadow: (x, y, blur, spread, color) => `
    box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
    -moz-box-shadow:${x}px ${y}px ${blur}px ${spread}px ${color};
    -webkit-box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};
  `,
  textShadow: (y, x, blur, color, multiplier = 3) => {
    let shadow = []
    let i = 0
    for (; i < multiplier; i += 1) {
      shadow.push(`${y}px ${x}px ${blur}px ${color}`)
    }
    return `text-shadow: ${shadow.join(',')};`
  },
  textNoSelect: `
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,
  gradient: (top, bottom, angle = 0) => `
    background: ${top};
    background: -moz-linear-gradient(${angle}deg, ${top} 0%, ${bottom} 100%);
    background: -webkit-linear-gradient(${angle}deg, ${top} 0%, ${bottom} 100%);
    background: linear-gradient(${angle}deg, ${top} 0%, ${bottom} 100%);
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
  pivotBar: 100,
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
