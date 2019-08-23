const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

module.exports = {
  pathPrefix: `/gatsby-mdx-suite`,
  siteMetadata: {
    title: `VANA`,
    description: `Website for Vana`,
    siteUrl: `https://vana.artist`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-sqip`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `VANA`,
        short_name: `VANA`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/assets/icon.svg`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `11vxbw8ly851`,
        ...(isProduction && !isStaging
          ? {
              accessToken: `S74T7D3ddNvCOjQa-e1Aj27QStF6x7ybiLVyvk7Y0oE`,
            }
          : {
              host: `preview.contentful.com`,
              accessToken: `7vfYQ71vlcsVa7nkTYII__Vq7OWelAofXtlJUqN8IvA`,
            }),
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `vanashafis`,
      },
    },
    {
      resolve: `gatsby-source-youtube-v2`,
      options: {
        channelId: ['UCzHoow2Ps9DtKUZ8kIO7rjg'],
        apiKey: 'AIzaSyAFm1L1Ay1iZMXU2FWT_c1L63jizyUK8uQ',
        maxVideos: 12,
      },
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
    `gatsby-plugin-sitemap`,
    ...(isProduction && !isStaging
      ? [
          `gatsby-plugin-offline`,
          {
            resolve: 'gatsby-plugin-matomo',
            options: {
              siteId: '7',
              matomoUrl: 'https://matomo.axe312.de',
              siteUrl: 'https://vana.artist',
            },
          },
        ]
      : []),
  ].filter(Boolean),
}
