module.exports = ({ mdx, doczSrc }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-theme-docz`,
      options: {
        filterComponents: (modules) => modules,
        src: doczSrc || 'src',
        files: `**/docs/*.{md,markdown,mdx}`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
  ].filter(Boolean),
})
