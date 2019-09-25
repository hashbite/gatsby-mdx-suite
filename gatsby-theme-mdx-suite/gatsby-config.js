const path = require('path')
const src = path.resolve(__dirname, '../packages/components')
const files = './docs/'

module.exports = ({
  instagram = {
    username: `timelapsa`,
  },
  youtube = {
    channelId: ['UCzHoow2Ps9DtKUZ8kIO7rjg'],
    apiKey: 'AIzaSyAFm1L1Ay1iZMXU2FWT_c1L63jizyUK8uQ',
    maxVideos: 12,
  },
}) => ({
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
    {
      resolve: `gatsby-source-instagram`,
      options: instagram,
    },
    {
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
  ],
})
