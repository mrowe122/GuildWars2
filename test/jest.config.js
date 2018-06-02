let ignoreFiles = [
  '!<rootDir>/src/**/index.js',
  '!<rootDir>/src/styles/variables.js',
  '!<rootDir>/src/utils/constants.js',
  '!<rootDir>/src/utils/routes.js',
  '!<rootDir>/src/normalize.js'
]

module.exports = {
  rootDir: '../',
  setupFiles: ['<rootDir>/test/jest.setup.js'],
  'moduleDirectories': ['src', 'node_modules'],
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.js'].concat(ignoreFiles),
  coverageReporters: ['text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
