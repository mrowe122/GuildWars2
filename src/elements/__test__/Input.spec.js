import React from 'react'
import Input from '../Input'

describe('Input', () => {
  let _component
  beforeEach(() => {
    _component = shallow(<Input {...globalProps} />).dive()
  })

  it('should render Input', () => {
    expect(_component.length).toBe(1)
  })
})
