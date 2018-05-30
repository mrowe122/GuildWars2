import { formatDate } from '../utilities'

describe('Utilities', () => {
  let date = 1527652311001 // 5/29/2018
  it('cleanString', () => {
    expect(formatDate(date)).toEqual('05/29/2018')
  })
})
