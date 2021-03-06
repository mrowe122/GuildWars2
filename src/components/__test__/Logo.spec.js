import React from 'react'
import Logo from '../Logo'

describe('Logo', () => {
  let _component
  beforeEach(() => {
    _component = shallow(<Logo {...globalProps} />).dive()
  })

  it('should render Logo', () => {
    expect(_component.length).toBe(1)
  })

  it('should contain Gw2Tracker.io text', () => {
    expect(_component.debug()).toContain('Gw2Tracker.io')
  })
})
