module.exports = ({ renderDocs = true }) => ({
  plugins: [
    /**
     * Docs
     */
    renderDocs && `gatsby-theme-mdx-suite-docs`,
    /**
     * Media
     */
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-inline-svg`,
    /**
     * SEO
     */
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    /**
     * Performance
     */
    `gatsby-plugin-bundle-stats`,
    `gatsby-plugin-webpack-size`,
  ].filter(Boolean),
})
