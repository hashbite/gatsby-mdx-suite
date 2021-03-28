const { resolve } = require('path')
const cheerio = require('cheerio')
const merge = require('deepmerge')
const webpack = require('webpack')

const minimumConfig = require('./minimum-config')

/**
 * Ensure webpack works with Gatsby & MDX
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: false,
        assert: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  })
}

/**
 * Allow all plugins and the actual page access the theme config
 */
exports.onPreBootstrap = async ({ getCache }, themeConfig) => {
  const cache = getCache()
  await cache.set('mdx-suite', {
    config: merge(minimumConfig, themeConfig, {
      arrayMerge: (destinationArray, sourceArray, options) => sourceArray,
    }),
  })
}

exports.createResolvers = ({ createResolvers, reporter }, themeConfig) => {
  const { mediaCollections } = merge(minimumConfig, themeConfig)
  const resolvers = {
    ContentfulMenuItem: {
      /**
       * Since Gatsby & Contentful have issues with reference fields that support multiple target content types,
       * we determine the menu item target programatically in this resolver.
       *
       * See: https://github.com/gatsbyjs/gatsby/issues/10090
       *
       * @todo this might be fixed already, check if workaround is still needed
       */
      internalTargetId: {
        type: 'String',
        args: { cache: 'String' },
        async resolve(source, args, context, info) {
          const linkedFields = Object.keys(source).filter(
            (name) => name.match(/^linked.+___NODE$/) && !!source[name]
          )

          if (!linkedFields || !linkedFields.length) {
            return null
          }

          const linkedPage = context.nodeModel.getNodeById({
            id: source[linkedFields[0]],
          })

          return linkedPage.contentful_id
        },
      },
    },
    Mdx: {
      /**
       * Attach referenced media assets with MDX source based on the themes collection configuration
       *
       * @todo this is to complex and hard to maintain. We should use custom Contentful references for this. See: https://github.com/axe312ger/gatsby-mdx-suite/issues/38
       *
       * This currently has to lowercase selectors and ids because of cheerio.
       *
       * Cheerio was a very convient and simply solution to integrate this, this should be refactored,
       * maybe even using MDX related packages to parse the MDX AST instead of parsing the source
       * as HTML code. On the other hand, selecting these components via dom selectors allow a lot
       * of flexibility and the selector syntax is well know to developers.
       *
       * See: https://github.com/axe312ger/gatsby-mdx-suite/issues/38
       */
      media: {
        type: ['ContentfulAsset'],
        args: {
          collectionType: 'String!',
        },
        async resolve(source, args, context, info) {
          const { collectionType } = args
          const { selector, attribute } = mediaCollections[collectionType]

          const $ = cheerio.load(source.rawBody)
          const cheerioResult = $(selector.toLowerCase())

          const mediaIds = cheerioResult
            .map((i, el) =>
              $(el).attr(
                (typeof attribute === 'function'
                  ? attribute(el)
                  : attribute
                ).toLowerCase()
              )
            )
            .get()

          if (mediaIds.length) {
            const meta = [
              source.fileAbsolutePath,
              context && context.context && context.context.title,
              context && context.context && context.context.locale,
              context && context.context && context.context.pageId,
            ]
              .filter(Boolean)
              .join(' - ')

            reporter.info(
              `Found ${mediaIds.length} assets for ${collectionType} in ${meta}`
            )
          }

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

/**
 * Create dummy types to allow queries to succeed even without data.
 */
exports.createSchemaCustomization = ({ actions, store, schema }) => {
  const { createTypes } = actions
  const { directory } = store.getState().program
  const config = require(resolve(directory, 'gatsby-config.js'))
  const enabledPlugins = config.plugins.map((plugin) =>
    typeof plugin === 'string' ? plugin : plugin.resolve
  )

  const typeDefs = [
    `
    type ContentfulAsset implements Node @derivedTypes @dontInfer {
      contentful_id: String
      spaceId: String
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      file: ContentfulAssetFile
      title: String
      description: String
      node_locale: String
      sys: ContentfulAssetSys
      svg: InlineSvg
    }

    type ContentfulAssetFile @derivedTypes {
      url: String
      details: ContentfulAssetFileDetails
      fileName: String
      contentType: String
    }

    type ContentfulAssetFileDetails @derivedTypes {
      size: Int
      image: ContentfulAssetFileDetailsImage
    }

    type ContentfulAssetFileDetailsImage {
      width: Int
      height: Int
    }

    type ContentfulAssetSys {
      type: String
      revision: Int
    }
    type InlineSvg @derivedTypes {
      content: String
    }
    type ContentfulMenuItem implements Node {
      contentful_id: String
      title: String
      node_locale: String
      internalSlug: String
      externalUri: String
      openInNewTab: Boolean
      hiddenOnMobile: Boolean
      subitems: [ContentfulMenuItem]
    }
    `,
    `
    type SitePageContext implements Node @dontInfer {
      pageNumber: Int
      title: String
      locale: String
      pageId: String
    }
    `,
  ]

  // Make gatsby-transformer-video optional
  if (!enabledPlugins.includes('gatsby-transformer-video')) {
    typeDefs.push(`
      type FakeScreenshot implements Node @dontInfer {
        publicURL: String
      }
    `)
    typeDefs.push(`
      type FakeVideo implements Node @dontInfer  {
        path: String
        aspectRatio: Float
        width: Int
        height: Int
      }
    `)
    typeDefs.push(
      schema.buildObjectType({
        name: 'ContentfulAsset',
        fields: {
          videoH264: {
            type: 'FakeVideo',
            args: {
              preset: 'String',
              fps: 'Int',
              duration: 'Int',
              maxWidth: 'Int',
            },
          },
          videoScreenshots: {
            type: 'FakeScreenshot',
            args: {
              width: 'Int',
              timestamps: ['String'],
            },
          },
        },
        interfaces: ['Node'],
      })
    )
  }

  createTypes(typeDefs)
}
