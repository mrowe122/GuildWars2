import { formatDate, ageFromSeconds, cleanString } from '../utilities'

describe('Utilities', () => {
  it('ageFromSeconds', () => {
    expect(ageFromSeconds(200000)).toEqual('55 hours 33 minutes')
    expect(ageFromSeconds(1800)).toEqual('30 minutes')
    expect(ageFromSeconds(7200)).toEqual('2 hours')
  })

  it('formatDate', () => {
    let date = 1527652311001 // 5/29/2018
    expect(formatDate(date)).toEqual('05/29/2018')
  })

  it('cleanString', () => {
    expect(cleanString('abc')).toEqual('abc')
  })
})
