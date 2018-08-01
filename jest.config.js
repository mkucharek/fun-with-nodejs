module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testMatch: [
    '**/__tests__/**/*.(ts|js)?(x)',
    '**/?(*.)+(spec|test).(ts|js)?(x)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
  ],
};
