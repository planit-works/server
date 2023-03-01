import type { Config } from 'jest';

export default (): Config => ({
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globalSetup: './setup.ts',
  globalTeardown: './teardown.ts',
});
