import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import theme from '../src/styles/variables'

Enzyme.configure({ adapter: new Adapter() })
global.shallow = shallow
global.render = render
global.mount = mount
global.globalProps = { theme }
global.fetch = require('jest-fetch-mock')
global.EmptyDiv = () => <div />