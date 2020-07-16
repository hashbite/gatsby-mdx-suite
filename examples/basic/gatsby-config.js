const themeUiConfig = require('./src/gatsby-plugin-theme-ui')

const isProduction = process.env.NODE_ENV === 'production'

// Duplicate and rename .env.example to .env and fill in your credentials
require('dotenv').config({ path: `.env` })

module.exports = {
  pathPrefix: ``,
  siteMetadata: {
    title: `Gatsby MDX Suite Minimal Example`,
    description: `Most minimal implementation of the suite`,
    siteUrl: `https://axe312ger.github.io/gatsby-starter-mdx-suite`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-mdx-suite-core`,
      options: {
        // Configure the MDX Suite
        themeUiConfig,
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
      // options: {}
    },
    // Project specific configuration
    `gatsby-transformer-video`,
    ...(isProduction
      ? [
          // Enable if you build on Netlify. Gatsby cloud users do not need this.
          // {
          //   resolve: 'gatsby-plugin-netlify-cache',
          //   options: {
          //     extraDirsToCache: [
          //       join('node_modules', '.cache', 'gatsby-transformer-video'),
          //       join('node_modules', '.cache', 'gatsby-transformer-video-bin'),
          //     ],
          //   },
          // },
        ]
      : []),
  ].filter(Boolean),
}
