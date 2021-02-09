module.exports = {
  moduleDirectories: [
    'node_modules',
    // add the directory with the test-utils.js file
    '<rootDir>/src/utils', // a utility folder
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
    '<rootDir>/__mocks__/matchMediaMock.js',
  ],
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^@theme$': '<rootDir>/src/theme$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
};
