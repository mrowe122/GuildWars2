module.exports = {
  rootDir: '../src',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
