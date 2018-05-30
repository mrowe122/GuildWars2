import { formatDate, ageFromSeconds } from '../utilities'

describe('Utilities', () => {
  let date = 1527652311001 // 5/29/2018
  let age = 287637

  it('cleanString', () => {
    expect(formatDate(date)).toEqual('05/29/2018')
  })

  it('ageFromSeconds', () => {
    expect(ageFromSeconds(age)).toEqual('79 hours 53 minutes')
  })
})
