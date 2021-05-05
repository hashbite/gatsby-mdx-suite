module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  rules: {
    'import/no-anonymous-default-export': [0],
    '@emotion/pkg-renaming': 'error',
    '@emotion/jsx-import': 'error',
    '@emotion/no-vanilla': 'error',
    '@emotion/import-from-emotion': 'error',
    '@emotion/styled-import': 'error',
  },
  plugins: ['@emotion'],
}
