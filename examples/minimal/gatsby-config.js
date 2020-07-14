const defaultThemeUiConfig = require('gatsby-theme-mdx-suite-core/src/gatsby-plugin-theme-ui')

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
        themeUiConfig: defaultThemeUiConfig,
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
    // Project specific plugins & configuration
    // ...
  ].filter(Boolean),
}
