const path = require('path')
const src = path.resolve(__dirname, '../components')
const files = './docs/'

module.exports = ({ instagram, youtube }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-theme-docz`,
      options: {
        filterComponents: false,
        src,
        files: `${files}/**/*.{md,markdown,mdx}`,
      },
    },
    instagram && {
      resolve: `gatsby-source-instagram`,
      options: instagram,
    },
    youtube && {
      resolve: `gatsby-source-youtube-v2`,
      options: youtube,
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '>',
              showLineNumbers: true,
              prompt: {
                user: 'you',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
  ].filter(Boolean),
})
