const cheerio = require('cheerio')

/**
 * Ensure @mdx-js dependencies build via webpack
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
  })
}

/**
 * Allow all plugins and the actual page access the theme config
 */
exports.onPreBootstrap = async ({ getCache }, themeConfig) => {
  const cache = getCache()
  await cache.set('mdx-suite', { config: themeConfig })
}

exports.createResolvers = ({ createResolvers }, { mediaCollections = {} }) => {
  const resolvers = {
    Mdx: {
      media: {
        type: ['ContentfulAsset'],
        args: {
          collectionType: 'String!',
        },
        async resolve(source, args, context, info) {
          const { selector, attribute } = mediaCollections[args.collectionType]

          const $ = cheerio.load(source.rawBody)
          const cheerioResult = $(selector)
          const mediaIds = cheerioResult
            .map((i, el) => $(el).attr(attribute))
            .get()

          const result = await context.nodeModel.runQuery({
            query: {
              filter: {
                contentful_id: { in: mediaIds },
              },
            },
            type: 'ContentfulAsset',
          })

          return result
        },
      },
    },
  }
  createResolvers(resolvers)
}
