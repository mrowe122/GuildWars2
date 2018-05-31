import { cachedData } from '../cachedData'

describe('cachedData', () => {
  it('should add url to cache', () => {
    cachedData.add('some/url/route')({ data: 'test' })
    expect(cachedData.cache).toHaveProperty('some/url/route')
  })

  it('should get url from when there is cache', () => {
    const payload = { data: 'test' }
    cachedData.add('some/url/route')(payload)
    const _data = cachedData.get('some/url/route')
    expect(_data).toBe(payload)
  })

  it('should return null when there is no cache', () => {
    const _data = cachedData.get('doesnt/exist')
    expect(_data).toBeNull()
  })
})
