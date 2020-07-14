const { existsSync } = require('fs')

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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: pagesPath,
      },
    },
    {
      // @todo do we need ths for the docs? plugin is already dependency of gatsby - https://www.gatsbyjs.org/packages/gatsby-plugin-page-creator/
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
    },
    {
      resolve: `gatsby-transformer-documentationjs`,
    },
  ].filter(Boolean),
})
