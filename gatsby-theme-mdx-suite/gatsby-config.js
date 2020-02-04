const isProduction = process.env.NODE_ENV === `production`
const isStaging = !!process.env.STAGING

const renderDocs = isStaging || !isProduction

module.exports = ({ mdx, forceDocs = false }) => ({
  plugins: [
    // Styling
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    // MDX
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
    // SEO
    `gatsby-plugin-react-helmet`,
  ].filter(Boolean),
})
