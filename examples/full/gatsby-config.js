const themeConfig = require('./tailwind.config.js')

const isProduction = process.env.NODE_ENV === 'production'

// Duplicate and rename .env.example to .env and fill in your credentials
require('dotenv').config({ path: `.env` })

const translationsEn = require('./translations/en')
const translationsDe = require('./translations/de')

module.exports = {
  pathPrefix: ``,
  siteMetadata: {
    title: `Gatsby MDX Suite Full Example`,
    description: `Gatsby MDX suite with i18n and blog features`,
    siteUrl: 'https://gatsbymdxsuiteexamplesfull.gtsb.io',
  },
  flags: { FAST_DEV: true },
  plugins: [
    {
      resolve: `gatsby-theme-mdx-suite-core`,
      options: {
        // Configure the MDX Suite
        themeConfig,
        /**
         * Internationalisation
         */
        langs: ['en-US', 'de'],
        // Map locales to path prefixes
        localeMap: {
          'en-US': '',
          de: 'de',
        },
        // Will be passes as resources to i18next.
        // See https://www.i18next.com/overview/configuration-options
        translations: {
          'en-US': translationsEn,
          de: translationsDe,
        },
        /**
         * Contentful credentials from environment variables will be used by default.
         * Never hardcode API credentials in your projects.
         * This is a exception for demonstration purposes.
         */
        contentful: {
          spaceId: `kkye7j4w7zwc`,
          accessToken: `yfNcvsaJfU6nmL6xzKwbP-WHw27vvDzjTCeFkg93pKk`,
          environment: `full`,
        },
      },
    },
    // Basic layout, SEO, Analytics and more
    {
      resolve: `gatsby-theme-mdx-suite-base`,
      options: {},
    },
    // Enable blog
    {
      resolve: `gatsby-theme-mdx-suite-blog`,
      // options: {}
    },
    // Project specific configuration
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby MDX Suite Full`,
        short_name: `mdx full`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `../../themes/base/src/assets/icon.svg`,
      },
    },
    // Optional plugins:
    `gatsby-transformer-video`,
    ...(isProduction
      ? [
          // Enable offline functionallity. Currently can cause issues for recurring users.
          // `gatsby-plugin-offline`,
        ]
      : []),
  ].filter(Boolean),
}
