import React from 'react'
import Header from '../Header'

describe('Header', () => {
  let _component
  beforeEach(() => {
    _component = shallow(<Header {...globalProps} />).dive()
  })

  it('should render Header', () => {
    expect(_component.length).toBe(1)
  })

  it('should have Sign In link', () => {
    const Link = _component.find('Link')
    expect(Link.debug()).toContain('Sign In')
  })
})
