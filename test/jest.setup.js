import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Provider Modules for mounting
import { BrowserRouter } from 'react-router-dom'
// import { LayoutProvider } from 'providers/MainLayout'
import { ThemeProvider } from 'emotion-theming'
import theme from '../src/styles/variables'

Enzyme.configure({ adapter: new Adapter() })
global.shallow = shallow
global.mount = node => mount(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {/* <LayoutProvider> broken until library gets published with new Context */}
      {node}
      {/* </LayoutProvider> */}
    </ThemeProvider>
  </BrowserRouter>
)
global.globalProps = { theme }
global.fetch = require('jest-fetch-mock')
global.EmptyDiv = () => <div />
