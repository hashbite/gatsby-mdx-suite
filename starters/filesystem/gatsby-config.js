const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

module.exports = {
  pathPrefix: `/gatsby-mdx-suite/filesystem`,
  siteMetadata: {
    title: `Gatsby MDX Suite`,
    description: `Gatsby MDX Suite starter using the file system`,
    siteUrl: `https://axe312ger.github.io/gatsby-mdx-suite`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby MDX Suite`,
        short_name: `mdx`,
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
    `gatsby-plugin-theme-ui`,
    `gatsby-theme-mdx-suite`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-sqip`,
    `gatsby-transformer-inline-svg`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    ...(isProduction && !isStaging ? [`gatsby-plugin-offline`] : []),
  ].filter(Boolean),
}
