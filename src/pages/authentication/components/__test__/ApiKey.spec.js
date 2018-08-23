import React from 'react'
import { ApiKeyModal, enhancer } from '../ApiKey'

describe('ApiKey', () => {
  describe('Enhancer', () => {
    let _component, Empty

    beforeEach(() => {
      fetch.resetMocks()
      localStorage.clear()
      Empty = enhancer(EmptyDiv)

      const _props = {
        setKey: jest.fn()
      }
      _component = mount(<Empty {..._props} />)
    })

    it('should mount', () => {
      expect(_component.length).toBe(1)
    })

    it('should handleChange', () => {
      const handleChange = _component.find(EmptyDiv).props().handleChange
      const event = {
        target: {
          value: 'test123'
        }
      }
      handleChange(event)
      _component.update()
      expect(_component.find(EmptyDiv).props().api).toBe('test123')
    })

    it('should submit with response', () => {
      fetch.once('12345')
      const submit = _component.find(EmptyDiv).props().submit
      submit().then(res => {
        expect(localStorage.__STORE__['apiKey']).toBe('12345')
      })
    })

    it('should submit with no response', () => {
      fetch.once('')
      const submit = _component.find(EmptyDiv).props().submit
      submit().then(res => {
        expect(localStorage.__STORE__['apiKey']).toBe(undefined)
      })
    })
  })

  describe('Component', () => {
    let _component

    beforeEach(() => {
      _component = props => shallow(<ApiKeyModal {...globalProps} {...props} />).dive()
    })

    it('should render invalid key error for 400', () => {
      const _props = {
        error: 400
      }
      expect(_component(_props).debug()).toContain('The key you provided is invalid')
    })

    it('should render default state to add a api key', () => {
      expect(_component().debug()).toContain('Add an API key')
    })

    it('should render loading state when validating key', () => {
      const _props = {
        keyLoading: true
      }
      expect(_component(_props).debug()).toContain('Validating your API key')
    })
  })
})
