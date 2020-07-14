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
         * Internationalisation
         *
         * To disable i18n:
         * 1. Use a single locale in "langs" array config: ['en']
         * 2. Map it in localeMap to an empty string: { en: '' }
         */
        // List your supported locales
        langs: ['en-US', 'de'],
        defaultLocale: 'en-US',
        // This maps locales to path prefixes
        localeMap: {
          'en-US': '',
          de: 'de',
        },
        // These will be passed to i18next.
        // You may consider haveing these in a seperate json file and import it.
        translations: {
          'en-US': {
            translation: {
              copyright: '© Copyright {{year}}. All rights reserved.',
              newsReadMore: 'Read more...',
              newsTimeToRead: '{{minutes}} min. to read',
            },
          },
          de: {
            translation: {
              copyright: '© Copyright {{year}}. Alle Rechte vorbehalten.',
              newsReadMore: 'Weiterlesen...',
              newsTimeToRead: '{{minutes}} Min. Lesezeit',
            },
          },
        },
        /**
         * Contentful credentials from environment variables will be used by default.
         * Never hardcode API credentials in your projects.
         * This is a exception for demonstration purposes.
         */
        contentful: {
          spaceId: `ep35pft871o5`,
          accessToken: `8547Gq5lgVFt9bX5hzsZd4WHIE6pFp-OPjTbdU_fMHc`,
        },
      },
    },
    // Basic layout, SEO, Analytics and more
    {
      resolve: `gatsby-theme-mdx-suite-base`,
    },
    // Project specific configuration
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby MDX Suite`,
        short_name: `mdx`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/assets/icon.svg`,
      },
    },
    `gatsby-transformer-video`,
    ...(isProduction
      ? [
          `gatsby-plugin-offline`,
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
