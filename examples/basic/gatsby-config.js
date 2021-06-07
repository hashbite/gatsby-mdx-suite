const themeConfig = require('./tailwind.config.js')

// Duplicate and rename .env.example to .env and fill in your credentials
require('dotenv').config({ path: `.env` })

module.exports = {
  pathPrefix: ``,
  siteMetadata: {
    title: `Gatsby MDX Suite Basic Example`,
    description: `Basic implementation of the suite.`,
    siteUrl: `https://gatsbymdxsuiteexamplesbasic.gtsb.io`,
  },
  flags: { FAST_DEV: true },
  plugins: [
    {
      resolve: `gatsby-theme-mdx-suite-core`,
      options: {
        // Configure the MDX Suite
        themeConfig,
        /**
         * Contentful credentials from environment variables will be used by default.
         * Never hardcode API credentials in your projects.
         * This is a exception for demonstration purposes.
         */
        contentful: {
          spaceId: `kkye7j4w7zwc`,
          accessToken: `yfNcvsaJfU6nmL6xzKwbP-WHw27vvDzjTCeFkg93pKk`,
          environment: `basic`,
        },
      },
    },
    // Basic layout, SEO, Analytics and more
    {
      resolve: `gatsby-theme-mdx-suite-base`,
      options: {
        privacy: {
          integrations: {},
        },
      },
    },
    // Optional plugins:
    `gatsby-transformer-video`,
  ].filter(Boolean),
}
