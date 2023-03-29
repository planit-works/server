import type { Config } from 'jest';

export default (): Config => ({
  moduleFileExtensions: ['js'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.js$',
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  maxWorkers: 1,
});
// "jest": {
//   "moduleFileExtensions": [
//     "js",
//     "json",
//     "ts"
//   ],
//     "rootDir": "dist",
//     "testRegex": ".*\\.spec\\.js$",
//     "collectCoverageFrom": [
//     "**/*.(t|j)s"
//   ],
//     "coverageDirectory": "../coverage",
//     "testEnvironment": "node"
// }
