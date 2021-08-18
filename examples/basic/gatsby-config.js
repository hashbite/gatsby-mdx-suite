const { resolve } = require('path')
const themeConfig = require('./tailwind.config.js')
const messagesEn = require('./src/locales/en-US/messages')

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
        translations: {
          'en-US': messagesEn,
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
    // We deploy this example to Netlify, so:
    `gatsby-plugin-netlify`,
    // Optional plugins:
    {
      resolve: `gatsby-transformer-video`,
      options: {
        // Move cache to node_modules to abuse Gatsby Cloud cache
        cacheDirectory: resolve('node_modules', '.cache-video'),
        cacheDirectoryBin: resolve('node_modules', '.cache-video-bin'),
      },
    },
  ].filter(Boolean),
}
