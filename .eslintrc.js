module.exports = {
  extends: `react-app`,
  plugins: ['cypress'],
  env: {
    'cypress/globals': true,
  },
  globals: {
    __PATH_PREFIX__: true,
  },
  rules: {
    'import/no-anonymous-default-export': [0],
  },
}
