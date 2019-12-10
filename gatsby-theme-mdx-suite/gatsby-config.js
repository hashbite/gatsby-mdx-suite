module.exports = ({ mdx, doczSrc }) => ({
  plugins: [
    // Styling
    'gatsby-plugin-theme-ui',
    `gatsby-plugin-emotion`,
    // Docs
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
    // SEO
    `gatsby-plugin-react-helmet`,
  ].filter(Boolean),
})
