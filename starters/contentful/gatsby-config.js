const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: `/gatsby-mdx-suite`,
  siteMetadata: {
    title: `Gatsby MDX Suite Contentful`,
    description: `Gatsby MDX Suite starter using Contentful`,
    siteUrl: `https://axe312ger.github.io/gatsby-mdx-suite`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-mdx-suite`,
      options: {
        langs: ['en-US', 'de'],
        defaultLocale: 'en-US',
        localeMap: {
          'en-US': 'en',
          de: 'de',
        },
        pageTypeMap: {
          page: null,
          blogPost: 'blog',
        },
        translations: {
          'en-US': {
            translation: {
              copyright: '© Copyright {{year}}. All rights reserved.',
              newsReadMore: 'Read more...',
              newsTimeToRead: '{{minutes}} min. to read',
            },
          },
          de: {
            translation: {
              copyright: '© Copyright {{year}}. Alle Rechte vorbehalten.',
              newsReadMore: 'Weiterlesen...',
              newsTimeToRead: '{{minutes}} Min. Lesezeit',
            },
          },
        },
        mediaCollections: {
          background: {
            selector:
              'section[backgroundimageid],viewport[backgroundimageid],header[backgroundimageid]',
            attribute: 'backgroundimageid',
          },
          images: {
            selector: 'image[id]',
            attribute: 'id',
          },
          floating: {
            selector: 'floatingimage[imageid]',
            attribute: 'imageid',
          },
        },
      },
    },
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
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        ...(isProduction && !isStaging
          ? {
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            }
          : {
              host: `preview.contentful.com`,
              accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
            }),
      },
    },
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-sqip`,
    `gatsby-transformer-inline-svg`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    ...(isProduction && !isStaging ? [`gatsby-plugin-offline`] : []),
  ].filter(Boolean),
}
