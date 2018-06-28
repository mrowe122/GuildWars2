import React from 'react'
import Button from '../Button'

describe('Button', () => {
  let _component
  beforeEach(() => {
    _component = props => shallow(<Button {...globalProps} {...props} />).dive()
  })

  it('should render Button', () => {
    expect(_component().length).toBe(1)
  })

  it('should render spinner when loading is true', () => {
    const _props = {
      loading: true
    }
    expect(_component(_props).find('Spinner').length).toBe(1)
  })
})
