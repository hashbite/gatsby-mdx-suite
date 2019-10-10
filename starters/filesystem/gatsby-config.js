const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

module.exports = {
  pathPrefix: `/gatsby-mdx-suite/filesystem`,
  siteMetadata: {
    title: `timelapsa`,
    description: `high quality timelapse content`,
    siteUrl: `https://axe312ger.github.io/gatsby-mdx-suite`,
  },
  plugins: [
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-theme-mdx-suite`,
      options: {
        instagram: {
          username: `timelapsa`,
        },
        youtube: {
          channelId: ['UCzHoow2Ps9DtKUZ8kIO7rjg'],
          apiKey: 'AIzaSyAFm1L1Ay1iZMXU2FWT_c1L63jizyUK8uQ',
          maxVideos: 12,
        },
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-sqip`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `timelapsa`,
        short_name: `tmlps`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/assets/icon.svg`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `page`,
        path: `${__dirname}/content/pages/`,
      },
    },
    `gatsby-plugin-sitemap`,
    ...(isProduction && !isStaging ? [`gatsby-plugin-offline`] : []),
  ].filter(Boolean),
}
