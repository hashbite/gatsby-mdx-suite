// const path = require('path')
// const src = path.resolve(process.cwd(), 'node_modules/@gatsby-mdx-suite')

module.exports = ({ mdx }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    // {
    //   resolve: `gatsby-theme-docz`,
    //   options: {
    //     src: src,
    //     files: `**/docs/*.{md,markdown,mdx}`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
  ].filter(Boolean),
})
