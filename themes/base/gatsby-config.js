module.exports = ({ renderDocs = true } = {}) => ({
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
    `gatsby-plugin-hoofd`,
    // {
    //   resolve: `gatsby-plugin-sitemap`,
    //   options: {
    //     exclude: [`/docs`, `/docs/*`, `/docs/**/*`],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: ['/docs/*'] }],
      },
    },
    /**
     * Performance
     */ `gatsby-plugin-bundle-stats`,
    `gatsby-plugin-webpack-size`,
  ].filter(Boolean),
})
