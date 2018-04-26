import { keyframes } from 'styled-components'

const colors = {
  primary: '#AC0765',
  primaryHover: '#7E0248',
  primaryDark: '#3E0023',
  white: '#ffffff',
  black: '#000000',
  alphaGray: 'rgba(75, 75, 75, 0.7)'
}

const sizes = {
  header: '65px'
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

export default {
  colors,
  sizes,
  generators,
  animations
}
