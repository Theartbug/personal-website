module.exports = {
  setupFilesAfterEnv: [
    './rtl.setup.js',
    'react-testing-library/cleanup-after-each',
  ],
  moduleDirectories: [
    __dirname, // the root directory
  ],
  testURL: "http://localhost/",
}