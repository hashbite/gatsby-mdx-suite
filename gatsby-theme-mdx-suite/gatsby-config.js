const { handler, resolver } = require('react-docgen-styled-resolver')

module.exports = ({ mdx }) => ({
  plugins: [
    // Styling
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    // MDX
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
    // SEO
    `gatsby-plugin-react-helmet`,
    // Docs
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `src/components/mdx/`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `node_modules/@gatsby-mdx-suite/`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `../../node_modules/@gatsby-mdx-suite/`,
      },
    },
    {
      resolve: `gatsby-transformer-react-docgen`,
      options: {
        resolver,
        handlers: [handler],
      },
    },
  ].filter(Boolean),
})
