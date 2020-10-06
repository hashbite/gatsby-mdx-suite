const merge = require('lodash/merge')

const minimumConfig = require('./minimum-config')

module.exports = (themeConfig) => {
  const { contentful, mdx } = merge(minimumConfig, themeConfig)

  return {
    plugins: [
      // Data
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: process.env.CONTENTFUL_SPACE_ID,
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
          host: process.env.CONTENTFUL_HOST || `cdn.contentful.com`,
          ...contentful,
        },
      },
      // MDX
      {
        resolve: `gatsby-plugin-mdx`,
        options: merge(
          {
            defaultLayouts: {
              docs: require.resolve(
                'gatsby-theme-mdx-suite-docs/src/templates/docs.js'
              ),
            },
          },
          mdx
        ),
      },
      // Styling
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postcssOptions: {
            plugins: ['tailwindcss', 'autoprefixer'],
          },
        },
      },
      // Media
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,
      // DX
      // `gatsby-plugin-loadable-components-ssr`,
    ].filter(Boolean),
  }
}
