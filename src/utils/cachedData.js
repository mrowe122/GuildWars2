class CachedDataClass {
  constructor () {
    this.cache = Object.create(null)
    this.cacheLimit = 5 * 60 * 1000 // 5 minutes
  }

  add = url => data => {
    this.cache[url] = { data, time: Date.now() }
    return data
  }

  get = url => {
    const _cache = this.cache[url]
    if (_cache && (Date.now() - _cache.time) < this.cacheLimit) {
      return _cache.data
    }
    return null
  }
}

export const cachedData = new CachedDataClass()
