const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

const renderDocs = isStaging || !isProduction

module.exports = ({ mdx, doczSrc, forceDocs = false }) => ({
  plugins: [
    // Styling
    'gatsby-plugin-theme-ui',
    `gatsby-plugin-emotion`,
    // Docs
    (forceDocs || renderDocs) && {
      resolve: `gatsby-theme-docz`,
      options: {
        filterComponents: (modules) => modules,
        src: doczSrc || 'src',
        files: `**/docs/*.{md,markdown,mdx}`,
        noRootRoute: true,
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
