class CachedDataClass {
  constructor () {
    this.cachedData = Object.create(null)
    this.cacheLimit = 5 * 60 * 1000 // 5 minutes
  }

  add = url => data => {
    this.cachedData[url] = { data, time: Date.now() }
    return data
  }

  get = url => {
    const _cache = this.cachedData[url]
    if (_cache) {
      if ((Date.now() - _cache.time) < this.cacheLimit) {
        return _cache.data
      }
    }
    return null
  }
}

export const cachedData = new CachedDataClass()
