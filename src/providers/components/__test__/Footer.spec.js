import React from 'react'
import Footer from '../Footer'

describe('Footer', () => {
  let _component
  beforeEach(() => {
    _component = shallow(<Footer {...globalProps} />).dive()
  })

  it('should render Footer', () => {
    expect(_component.length).toBe(1)
  })
})
