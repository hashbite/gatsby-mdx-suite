const { existsSync } = require('fs')
const { handler, resolver } = require('react-docgen-styled-resolver')

const defaultComponentPaths = [
  `src/components/mdx/`,
  `node_modules/@gatsby-mdx-suite/`,
  `../../node_modules/@gatsby-mdx-suite/`,
]

module.exports = ({ mdx, componentPaths = defaultComponentPaths }) => ({
  plugins: [
    // Styling
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('postcss-import'),
          // require('tailwindcss')(process.cwd() + '/tailwind.config.js'),
          require('postcss-preset-env')({
            autoprefixer: { grid: true },
            features: {
              'nesting-rules': true,
            },
            // browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
          }),
        ],
      },
    },
    // MDX
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
    // SEO & Performance
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-bundle-stats`,
    // Docs
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
  ].filter(Boolean),
})
