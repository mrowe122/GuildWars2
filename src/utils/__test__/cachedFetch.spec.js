import React from 'react'
import { fetchHoc } from '../cachedFetch'

describe('fetchHoc', () => {
  it('should have get and post methods', () => {
    expect(fetchHoc.get).toBeDefined()
    expect(fetchHoc.post).toBeDefined()
  })

  describe('get-fetch', () => {
    let _Hoc, _component, _props, url
    let i = 1

    beforeEach(() => {
      fetch.resetMocks()
      _Hoc = null
      _component = null
      _props = null
      url = 'url.com/' + ++i
    })

    it('should have default props', () => {
      fetch.once(JSON.stringify({ body: '12345' }))
      _Hoc = fetchHoc.get(url)(EmptyDiv)
      _component = mount(<_Hoc />).find(EmptyDiv)
      _props = _component.props()
      expect(_props).toEqual({
        loading: true,
        data: undefined,
        errorStatus: null,
        getFetch: _props.getFetch
      })
    })

    it('should have overwritten prop names', () => {
      fetch.once(JSON.stringify({ body: '12345' }))
      _Hoc = fetchHoc.get(url, { dataProp: 'testData', name: 'testFetch' })(EmptyDiv)
      _component = mount(<_Hoc />).find(EmptyDiv)
      _props = _component.props()
      expect(_props).toEqual({
        loading: true,
        testData: undefined,
        errorStatus: null,
        testFetch: _props.testFetch
      })
    })

    it('should have loading false when call is onClick', () => {
      fetch.once(JSON.stringify({ body: '12345' }))
      _Hoc = fetchHoc.get(url, { call: 'onClick' })(EmptyDiv)
      _component = mount(<_Hoc />).find(EmptyDiv)
      _props = _component.props()
      expect(_props).toEqual({
        loading: false,
        data: undefined,
        getFetch: _props.getFetch
      })
    })

    it('should call getFetch with data', () => {
      fetch.once(JSON.stringify({ body: '12345' }))
      _Hoc = fetchHoc.get(url, { call: 'onClick' })(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.getFetch().then(() => {
        _root.update()
        const _props = _root.find(EmptyDiv).props()
        expect(_props.loading).toBeFalsy()
        expect(_props.data).toBe('12345')
        expect(_props.errorStatus).toBeNull()
      })
    })

    it('should call getFetch with data', () => {
      fetch.once(JSON.stringify({ body: '12345' }))
      _Hoc = fetchHoc.get('url/:id', { call: 'onClick' })(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.getFetch({ id: '123' }).then(() => {
        _root.update()
        const _updatedProps = _root.find(EmptyDiv).props()
        expect(_updatedProps.loading).toBeFalsy()
        expect(_updatedProps.data).toBe('12345')
        expect(_updatedProps.errorStatus).toBeNull()
      })
    })

    it('should respond with cached data', () => {
      fetch
        .once(JSON.stringify({ body: 'cached data' }))
        .once(JSON.stringify({ body: 'new data' }))
      _Hoc = fetchHoc.get('lkjhsadgfglkasdjhg', { call: 'onClick' })(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.getFetch().then(() => {
        _root.update()
        const _updatedProps1 = _root.find(EmptyDiv).props()
        expect(_updatedProps1.loading).toBeFalsy()
        expect(_updatedProps1.data).toBe('cached data')
        expect(_updatedProps1.errorStatus).toBeNull()
        return _props.getFetch()
      }).then(() => {
        _root.update()
        const _updatedProps2 = _root.find(EmptyDiv).props()
        expect(_updatedProps2.loading).toBeFalsy()
        expect(_updatedProps2.data).toBe('cached data')
        expect(_updatedProps2.errorStatus).toBeNull()
      })
    })

    it('should return a user error response', () => {
      fetch.once(JSON.stringify({ text: 'unauthorized' }), { status: 403 })
      _Hoc = fetchHoc.get(url, { call: 'onClick' })(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.getFetch().then(() => {
        _root.update()
        const _updatedProps = _root.find(EmptyDiv).props()
        expect(_updatedProps.loading).toBeFalsy()
        expect(_updatedProps.data).toBeUndefined()
        expect(_updatedProps.errorStatus).toBe(403)
      })
    })

    it('should run abort controller when unmounting', () => {
      const propWithContoller = { controller: { abort: jest.fn() } }
      fetch.mockReject({ name: 'AbortError' })
      _Hoc = fetchHoc.get(url, { props: propWithContoller })(EmptyDiv)
      const _root = mount(<_Hoc />)
      _root.unmount()
      expect(propWithContoller.controller.abort).toHaveBeenCalled()
    })
  })

  describe('post-fetch', () => {
    let _Hoc, _component, _props, url, payload

    beforeEach(() => {
      fetch.resetMocks()
      _Hoc = null
      _component = null
      _props = null
      url = 'url.com'
      payload = { body: '12345' }
    })

    it('should have default props', () => {
      _Hoc = fetchHoc.post(url)(EmptyDiv)
      _component = mount(<_Hoc />).find(EmptyDiv)
      _props = _component.props()
      expect(_props).toEqual({
        loading: false,
        data: undefined,
        postFetch: _props.postFetch
      })
    })

    it('should have default props with empty props', () => {
      _Hoc = fetchHoc.post(url, {})(EmptyDiv)
      _component = mount(<_Hoc />).find(EmptyDiv)
      _props = _component.props()
      expect(_props).toEqual({
        loading: false,
        data: undefined,
        postFetch: _props.postFetch
      })
    })

    it('should have custom props', () => {
      _Hoc = fetchHoc.post(url, { dataProp: 'customData', name: 'customPost' })(EmptyDiv)
      _component = mount(<_Hoc />).find(EmptyDiv)
      _props = _component.props()
      expect(_props).toEqual({
        loading: false,
        customData: undefined,
        customPost: _props.customPost
      })
    })

    it('should return data', () => {
      fetch.once(JSON.stringify(payload))
      _Hoc = fetchHoc.post(url)(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.postFetch({ user: 'name' }).then(() => {
        _root.update()
        const _updatedProps = _root.find(EmptyDiv).props()
        expect(_updatedProps.loading).toBeFalsy()
        expect(_updatedProps.data).toBe(JSON.stringify(payload))
        expect(_updatedProps.errorStatus).toBeNull()
      })
    })

    it('should return an error', () => {
      fetch.once(JSON.stringify({ text: 'unauthorized' }), { status: 403 })
      _Hoc = fetchHoc.post(url)(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.postFetch(payload).then(res => {
        _root.update()
        const _updatedProps = _root.find(EmptyDiv).props()
        expect(_updatedProps.loading).toBeFalsy()
        expect(_updatedProps.data).toBeUndefined()
        expect(_updatedProps.errorStatus).toBe(403)
      })
    })

    it('should run abort controller when unmounting', () => {
      const propWithContoller = { controller: { abort: jest.fn() } }
      fetch.mockReject({ name: 'AbortError' })
      _Hoc = fetchHoc.post(url, { props: propWithContoller })(EmptyDiv)
      const _root = mount(<_Hoc />)
      _props = _root.find(EmptyDiv).props()
      _props.postFetch(payload)
      _root.unmount()
      expect(propWithContoller.controller.abort).toHaveBeenCalled()
    })
  })
})
