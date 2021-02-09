module.exports = {
  verbose: true,
  preset: 'jest-preset-angular',
  roots: ['src/app', 'libs'],
  setupFilesAfterEnv: ['./src/setupJest.ts'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  collectCoverageFrom: ['src/**/*.ts'],
  collectCoverage: true,
  coverageReporters: ['lcov', ['html']],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-test': {
      tsConfig: './tsconfig.spec.json',
      stringifyContentPathRegex: '\\html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripsStylesTransformer'
      ]
    },
    Clipboardevent: {}
  },
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  moduleNameMapper: {
    '@test21-core/(.*)': [
      '<rootDir>/libs/core-apps/$1',
      '<rootDir>/libs/core-components/$1'
    ]
  }
};
