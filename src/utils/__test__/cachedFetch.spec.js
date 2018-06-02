import React from 'react'
import { fetchHoc } from '../cachedFetch'

describe.skip('fetchHoc', () => {
  it('should have get and post methods', () => {
    expect(fetchHoc.get).toBeDefined()
    expect(fetchHoc.post).toBeDefined()
  })

  describe('get-fetch', () => {
    let _Hoc, _component, _props

    beforeEach(() => {
      fetch.resetMocks()
    })

    // it('should have default props', () => {
    //   _Hoc = fetchHoc.get('url')(EmptyDiv)
    //   _component = mount(<_Hoc />).find(EmptyDiv)
    //   _props = _component.props()
    //   expect(_props).toEqual({
    //     loading: true,
    //     data: undefined,
    //     errorStatus: null,
    //     getFetch: _props.getFetch
    //   })
    // })

    // it('should have loading false when call is onClick', () => {
    //   _Hoc = fetchHoc.get('url', { call: 'onClick' })(EmptyDiv)
    //   _component = mount(<_Hoc />).find(EmptyDiv)
    //   _props = _component.props()
    //   expect(_props).toEqual({
    //     loading: false,
    //     data: undefined,
    //     getFetch: _props.getFetch
    //   })
    // })

    // it('should have overwritten prop names', () => {
    //   _Hoc = fetchHoc.get('url', { dataProp: 'testData', name: 'testFetch' })(EmptyDiv)
    //   _component = mount(<_Hoc />).find(EmptyDiv)
    //   _props = _component.props()
    //   expect(_props).toEqual({
    //     loading: true,
    //     testData: undefined,
    //     errorStatus: null,
    //     testFetch: _props.testFetch
    //   })
    // })

    // it('should call getFetch', () => {
    //   _Hoc = fetchHoc.get('url.com', { call: 'onClick' })(EmptyDiv)
    //   const _temp = mount(<_Hoc />)
    //   _component = _temp.find(EmptyDiv)
    //   _props = _component.props()
    //   fetch.mockResponse({ data: '12345' })
    //   _props.getFetch().then(res => {
    //     console.log(res)
    //     _temp.update()
    //     console.log(_temp.find(EmptyDiv).props())
    //   })
    // })
  })
})
