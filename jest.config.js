const test = {
  displayName: 'test',
  clearMocks: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js"
  },
  setupFiles: ["./src/setupTests.js"],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ]
};

const lint = {
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: [
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.jsx',
    '<rootDir>/doc_src/**/*.js',
    '<rootDir>/doc_src/**/*.jsx'
  ]
};

module.exports = {
  projects: [lint, test],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
  coverageReporters: ['cobertura']
};