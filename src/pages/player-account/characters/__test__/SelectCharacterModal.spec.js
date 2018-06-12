import React from 'react'
import SelectCharacterModal from '../SelectCharacterModal'

describe('SelectCharacterModal', () => {
  let _component

  beforeEach(() => {
    _component = props => shallow(<SelectCharacterModal {...globalProps} {...props} />).dive()
  })

  it('should render SelectCharacterModal with no characters', () => {
    const _props = { allChars: [] }
    expect(_component(_props).debug()).toContain('You have not created any characters yet')
  })

  it('should render SelectCharacterModal with a character', () => {
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
