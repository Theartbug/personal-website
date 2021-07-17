module.exports = {
  "moduleNameMapper": {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/src/tests/mocks/fileMock.js"
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
}