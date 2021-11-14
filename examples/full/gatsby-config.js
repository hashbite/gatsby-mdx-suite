const { resolve } = require('path')
const merge = require('deepmerge')

const tailwindConfigStub = require('gatsby-theme-mdx-suite-core/src/tailwind.default.config')
const minimumConfig = require('gatsby-theme-mdx-suite-core/minimum-config')

const themeConfig = require('./tailwind.config.js')
const localesEn = require('./src/locales/en-US/messages')
const localesDe = require('./src/locales/de/messages')

const isProduction = process.env.NODE_ENV === 'production'

// Duplicate and rename .env.example to .env and fill in your credentials
require('dotenv').config({ path: `.env` })

function prepareMdxSuiteOptions(config) {
  const mergedConfig = merge(minimumConfig, config, {
    arrayMerge: (destinationArray, sourceArray, options) => sourceArray,
  })

  const theme = merge(tailwindConfigStub, mergedConfig.themeConfig.theme.extend)

  const cleanConfig = Object.entries(mergedConfig)
    .filter(([key]) => !['themeConfig', 'mediaCollections'].includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})

  // @todo clean up this mess!
  return { ...cleanConfig, cleanConfig, theme }
}

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
      options: prepareMdxSuiteOptions({
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
        // Will be passed to LinguiJS.
        // @todo can't we automatically import that in onPreInit?
        translations: {
          'en-US': localesEn.messages,
          de: localesDe.messages,
        },
        /**
         * @todo this is!!! exposed via page state json. Switch to env vars!!
         * Contentful credentials from environment variables will be used by default.
         * Never hardcode API credentials in your projects.
         * This is a exception for demonstration purposes.
         */
        contentful: {
          spaceId: `kkye7j4w7zwc`,
          accessToken: `yfNcvsaJfU6nmL6xzKwbP-WHw27vvDzjTCeFkg93pKk`,
          environment: `full`,
        },
      }),
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
    // We deploy this example to Netlify, so:
    `gatsby-plugin-netlify`,
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
    {
      resolve: `gatsby-transformer-video`,
      options: {
        // Move cache to node_modules to abuse Gatsby Cloud cache
        cacheDirectory: resolve('node_modules', '.cache-video'),
        cacheDirectoryBin: resolve('node_modules', '.cache-video-bin'),
      },
    },
    `gatsby-transformer-sqip`,
    ...(isProduction
      ? [
          // Enable offline functionallity. Currently can cause issues for recurring users.
          // `gatsby-plugin-offline`,
        ]
      : []),
  ].filter(Boolean),
}
