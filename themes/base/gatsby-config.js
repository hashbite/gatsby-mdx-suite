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
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-hoofd`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/docs`, `/docs/*`, `/docs/**/*`],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: ['/docs/*'] }],
      },
    },
    /**
     * Performance
     */ `gatsby-plugin-bundle-stats`,
  ].filter(Boolean),
})
