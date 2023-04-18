module.exports = {
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.pug$': 'pug-plain-loader'
  },
  globals: {
    'vue-jest': {
      pug: {
        doctype: 'html' // or 'xml', etc
      }
    }
  },
  testMatch: ['**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'],
  testURL: 'http://localhost/'
}
