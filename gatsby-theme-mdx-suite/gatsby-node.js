const cheerio = require('cheerio')
const Debug = require('debug')

const debug = Debug('gatsby-theme-mdx-suite')

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
          const { collectionType } = args
          const { selector, attribute } = mediaCollections[collectionType]

          const $ = cheerio.load(source.rawBody)
          const cheerioResult = $(selector)

          const mediaIds = cheerioResult
            .map((i, el) =>
              $(el).attr(
                typeof attribute === 'function' ? attribute(el) : attribute
              )
            )
            .get()

          debug(
            `Found ${mediaIds.length} assets for ${collectionType} in ${source.fileAbsolutePath} (${source.id})`
          )

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
