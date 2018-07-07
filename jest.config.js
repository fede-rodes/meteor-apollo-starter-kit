// https://www.okgrow.com/posts/real-world-unit-testing-with-meteor-and-jest
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [
    '<rootDir>/tests/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
  ],
  modulePaths: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/mocks/',
    '<rootDir>/node_modules/jest-meteor-stubs/lib/',
  ],
  roots: [
    '<rootDir>/imports/',
    '<rootDir>/tests/',
  ],
  moduleNameMapper: {
    '^imports/(.*)': '<rootDir>/imports/',
    '^(.*):(.*)$': '$1_$2',
  },
  unmockedModulePathPatterns: [
    '/^imports\\/.*\\.jsx?$/',
    '/^imports\\/.*\\.graphql$/',
    '/^client\\/.*\\.jsx?$/',
    '/^server\\/.*\\.jsx?$/',
    '/^node_modules/',
  ],
};
