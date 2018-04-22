const colors = {
  primary: '#AC0765',
  primaryHover: '#7E0248',
  primaryDark: '#3E0023',
  white: '#ffffff',
  black: '#000000'
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

export default {
  colors,
  sizes,
  generators
}
