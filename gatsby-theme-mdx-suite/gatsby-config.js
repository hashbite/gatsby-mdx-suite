const { existsSync } = require('fs')

const merge = require('lodash/merge')
const { handler, resolver } = require('react-docgen-styled-resolver')

const defaultComponentPaths = [
  `src/components/mdx/`,
  `node_modules/@gatsby-mdx-suite/`,
  `../../node_modules/@gatsby-mdx-suite/`,
]

const pagesPath = `${__dirname}/pages`

module.exports = ({
  mdx = { extensions: [`.mdx`, `.md`] },
  componentPaths = defaultComponentPaths,
}) => ({
  plugins: [
    // Styling
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    // MDX
    {
      resolve: `gatsby-plugin-mdx`,
      options: merge(
        {
          defaultLayouts: {
            docs: require.resolve('./src/templates/docs.js'),
          },
        },
        mdx
      ),
    },
    // SEO & Performance
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-bundle-stats`,
    `gatsby-plugin-webpack-size`,
    // Docs
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: pagesPath,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: pagesPath,
      },
    },
    ...componentPaths
      .map((componentPath) => {
        if (existsSync(componentPath)) {
          return {
            resolve: `gatsby-source-filesystem`,
            options: {
              path: componentPath,
            },
          }
        }
        return false
      })
      .filter(Boolean),
    {
      resolve: `gatsby-transformer-react-docgen`,
      options: {
        resolver,
        handlers: [handler],
      },
    },
    {
      resolve: `gatsby-transformer-documentationjs`,
    },
  ].filter(Boolean),
})
