import React from 'react'
import { CharacterSelectModal, ErrorCharacterModal } from '../CharactersModals'

describe('Characters Modals', () => {
  describe('CharacterSelectModal', () => {
    let _component

    beforeEach(() => {
      _component = props => shallow(<CharacterSelectModal {...globalProps} {...props} />).dive()
    })

    it('should render CharacterSelectModal with no characters', () => {
      const _props = { allChars: [] }
      expect(_component(_props).debug()).toContain('You have not created any characters yet')
    })

    it('should render CharacterSelectModal with a character', () => {
      const _props = {
        allChars: ['character name'],
        closeModal: jest.fn(),
        modalSelectChar: jest.fn()
      }
      expect(_component(_props).debug()).toContain('character name')
    })

    it('should handle on click of character', () => {
      const _props = {
        allChars: ['character name'],
        closeModal: jest.fn(),
        modalSelectChar: jest.fn()
      }
      const char = _component(_props).find('a')
      char.props().onClick()
      expect(_props.modalSelectChar).toBeCalled()
      expect(_props.closeModal).toBeCalled()
    })
  })

  describe('ErrorCharacterModal', () => {
    let _component

    beforeEach(() => {
      _component = props => shallow(<ErrorCharacterModal {...globalProps} {...props} />).dive()
    })

    it('should render ErrorCharacterModal no key provided', () => {
      const _props = {
        errorStatus: 403,
        closeModal: jest.fn()
      }
      expect(_component(_props).debug()).toContain('The key you provided is either invalid or does not permit character access')
      expect(_component(_props).find('button').length).toBe(1)
    })

    it('should render ErrorCharacterModal to add an API key', () => {
      const _props = {
        errorStatus: 401,
        closeModal: jest.fn()
      }
      expect(_component(_props).debug()).toContain('Add an API key')
      expect(_component(_props).find('button').length).toBe(1)
    })

    it('should render ErrorCharacterModal with no key provided', () => {
      const _props = {
        keyLoading: true,
        errorStatus: null,
        closeModal: jest.fn()
      }
      expect(_component(_props).debug()).toContain('Validating your API key')
      expect(_component(_props).find('Spinner').length).toBe(1)
    })
  })
})
