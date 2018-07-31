import React from 'react'
import FullPageLoader from '../Loading'

describe('FullPageLoader', () => {
  let _component
  beforeEach(() => {
    _component = shallow(<FullPageLoader {...globalProps} />).dive()
  })

  it('should render FullPageLoader', () => {
    expect(_component.length).toBe(1)
  })
})
