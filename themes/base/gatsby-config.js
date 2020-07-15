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
     * SEO & Performance
     */
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-bundle-stats`,
    `gatsby-plugin-webpack-size`,
    `gatsby-plugin-sitemap`,
  ].filter(Boolean),
})
