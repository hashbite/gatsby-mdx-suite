const { resolve } = require('path')
const cheerio = require('cheerio')
const merge = require('deepmerge')
const webpack = require('webpack')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require(`gatsby/graphql`)

const minimumConfig = require('./minimum-config')

const {
  schemes: { ImageResizingBehavior, ImageCropFocusType },
} = require(`gatsby-source-contentful`)

/**
 * Ensure webpack works with Gatsby & MDX
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        path: require.resolve('path-browserify'),
        assert: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process',
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
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
    ContentfulContentTypeMenuItem: {
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

          return linkedPage.sys.id
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
                sys: { id: { in: mediaIds } },
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
    type ContentfulMenuItem implements Node  @derivedTypes {
      internalSlug: String
      externalUri: String
      openInNewTab: Boolean
      hiddenOnMobile: Boolean
    }
    `,
    `
    type SitePageContext implements Node @derivedTypes {
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
        childImageSharp: ImageSharp
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
          videoH265: {
            type: 'FakeVideo',
            args: {
              preset: 'String',
              fps: 'Int',
              duration: 'Int',
              maxWidth: 'Int',
            },
          },
          videoVP9: {
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

  // Make gatsby-transformer-sqip optional
  if (!enabledPlugins.includes('gatsby-transformer-sqip')) {
    typeDefs.push(
      schema.buildObjectType({
        name: 'ContentfulAsset',
        fields: {
          sqip: {
            type: new GraphQLObjectType({
              name: `SqipContentful`,
              fields: {
                svg: { type: GraphQLString },
                dataURI: { type: GraphQLString },
              },
            }),
            args: {
              blur: {
                type: GraphQLInt,
                defaultValue: 1,
              },
              numberOfPrimitives: {
                type: GraphQLInt,
                defaultValue: 10,
              },
              mode: {
                type: GraphQLInt,
                defaultValue: 0,
              },
              width: {
                type: GraphQLInt,
                defaultValue: 256,
              },
              height: {
                type: GraphQLInt,
              },
              resizingBehavior: {
                type: ImageResizingBehavior,
              },
              cropFocus: {
                type: ImageCropFocusType,
                defaultValue: null,
              },
              background: {
                type: GraphQLString,
                defaultValue: null,
              },
            },
            async resolve(asset, fieldArgs, context) {
              return null
            },
          },
        },
        interfaces: ['Node'],
      })
    )
  }

  createTypes(typeDefs)
}
