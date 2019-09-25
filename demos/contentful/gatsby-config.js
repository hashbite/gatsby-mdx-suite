const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

module.exports = {
  pathPrefix: `/gatsby-mdx-suite/contentful`,
  siteMetadata: {
    title: `timelapsa`,
    description: `high quality timelapse content`,
    siteUrl: `https://axe312ger.github.io/gatsby-mdx-suite`,
  },
  plugins: [
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-theme-mdx-suite`,
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
    `gatsby-plugin-sitemap`,
    ...(isProduction && !isStaging ? [`gatsby-plugin-offline`] : []),
  ].filter(Boolean),
}
