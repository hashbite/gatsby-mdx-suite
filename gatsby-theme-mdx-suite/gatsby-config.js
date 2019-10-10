const path = require('path')
const src = path.resolve(__dirname, '../components')
const files = './docs/'

module.exports = ({ mdx }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-theme-docz`,
      options: {
        filterComponents: false,
        src,
        files: `${files}/**/*.{md,markdown,mdx}`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
  ].filter(Boolean),
})
