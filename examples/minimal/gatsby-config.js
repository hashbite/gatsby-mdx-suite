const themeUiConfig = require('./src/gatsby-plugin-theme-ui')

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
          environment: `minimal`,
        },
      },
    },
    // Project specific plugins & configuration
    // ...
  ].filter(Boolean),
}
