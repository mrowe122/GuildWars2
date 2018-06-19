import React from 'react'
import { Authorized, enhancer } from '../Authorized'

describe('ApiKeyModal', () => {
  describe('Enhancer', () => {
    let _component, Empty

    beforeEach(() => {
      Empty = enhancer(EmptyDiv)
      _component = mount(<Empty />)
    })

    it('should mount', () => {
      expect(_component.length).toBe(1)
    })
  })

  describe('Component', () => {
    let _component

    beforeEach(() => {
      _component = props => shallow(<Authorized {...props} />)
    })

    it('should render redirect when pathname is /account', () => {
      const _props = {
        location: {
          pathname: '/account'
        },
        path: '/'
      }
      expect(_component(_props).find('Redirect').length).toBe(1)
    })

    it('should render route', () => {
      const _props = {
        location: {
          pathname: '/test'
        },
        path: '/'
      }

      expect(_component(_props).find('Route').length).toBe(1)
    })

    it('should run routes render', () => {
      const _props = {
        location: {
          pathname: '/test'
        },
        path: '/',
        component: EmptyDiv
      }

      const render = _component(_props).find('Route').props().render
      expect(shallow(render()).find('div').length).toBe(1)
    })
  })
})