const { resolve } = require('path')
const cheerio = require('cheerio')
const Debug = require('debug')

const debug = Debug('gatsby-theme-mdx-suite')

const REGEX_DEPENDENCY_COMPONENT = /node_modules\/(@[^\\/]+\/[^@\\/]+|[^@\\/]+)\//

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

const generateComponentSlug = ({ packageName, parentName }) =>
  encodeURIComponent([packageName, parentName].filter((v) => !!v).join('/'))
    .replace(/%2F/g, '/')
    .replace(/%40/g, '')
    .toLowerCase()

exports.createResolvers = ({ createResolvers }, { mediaCollections = {} }) => {
  const resolvers = {
    ContentfulMenuItem: {
      /**
       * Since Gatsby & Contentful have issues with reference fields that support multiple target content types,
       * we determine the menu item target programatically in this resolver.
       *
       * See: https://github.com/gatsbyjs/gatsby/issues/10090
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
       * @todo
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
    ComponentMetadata: {
      // Match markdown dokumentation page with component metadata
      longDescription: {
        type: 'Mdx',
        async resolve(source, args, context, info) {
          const parent = await context.nodeModel.findRootNodeAncestor(source)

          const fileNode = await context.nodeModel.runQuery({
            query: {
              filter: {
                dir: { eq: parent.dir },
                name: { eq: parent.name },
                extension: { in: ['md', 'mdx'] },
              },
            },
            type: 'File',
            firstOnly: true,
          })

          if (!fileNode) {
            return null
          }

          const mdxNode = await context.nodeModel.runQuery({
            query: {
              filter: {
                parent: { id: { eq: fileNode.id } },
              },
            },
            type: 'Mdx',
            firstOnly: true,
          })

          return mdxNode
        },
      },
      // Attach package name to component of dependencies
      packageName: {
        type: 'String',
        async resolve(source, args, context, info) {
          const parent = await context.nodeModel.findRootNodeAncestor(source)

          const typeResult = parent.absolutePath.match(
            REGEX_DEPENDENCY_COMPONENT
          )

          return typeResult ? typeResult[1] : null
        },
      },
      // Path of documentation page for the component
      path: {
        type: 'String',
        async resolve(source, args, context, info) {
          const parent = await context.nodeModel.findRootNodeAncestor(source)

          const typeResult = parent.absolutePath.match(
            REGEX_DEPENDENCY_COMPONENT
          )
          const packageName = typeResult ? typeResult[1] : null

          return `/docs/component/${generateComponentSlug({
            packageName,
            parentName: parent.name,
          })}`
        },
      },
      // Generate slug as human readable component id
      slug: {
        type: 'String',
        async resolve(source, args, context, info) {
          const parent = await context.nodeModel.findRootNodeAncestor(source)

          const typeResult = parent.absolutePath.match(
            REGEX_DEPENDENCY_COMPONENT
          )
          const packageName = typeResult ? typeResult[1] : null

          return generateComponentSlug({
            packageName,
            parentName: parent.name,
          })
        },
      },
      // Filename of the component source file
      filename: {
        type: 'String',
        async resolve(source, args, context, info) {
          const parent = await context.nodeModel.findRootNodeAncestor(source)

          return parent.name
        },
      },
      // Examples extracted out of the components description via JSDoc @example doclet
      examples: {
        type: ['DocumentationJsExample'],
        async resolve(source, args, context, info) {
          const DocumentationJsNode = await context.nodeModel.runQuery({
            query: {
              filter: {
                memberof: { eq: null },
                level: { eq: 0 },
                name: { eq: source.displayName },
              },
            },
            type: 'DocumentationJs',
            firstOnly: true,
          })

          if (!DocumentationJsNode) {
            return null
          }

          return DocumentationJsNode.examples
        },
      },
    },
  }
  createResolvers(resolvers)
}

/**
 * Create dummy types to allow docs query for all kinds of assets
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
    type FakeFile implements Node @dontInfer {
      url: String
      childImageSharp: ImageSharp
    }
    `,
    `
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
  ]

  // Add nulled video data
  if (!enabledPlugins.includes('gatsby-transformer-video')) {
    typeDefs.push(`
      type FakeVideo implements Node @dontInfer  {
        path: String
      }
    `)
    typeDefs.push(
      schema.buildObjectType({
        name: 'ContentfulAsset',
        fields: {
          videoH264: {
            type: 'FakeVideo',
            args: {
              fps: 'Int',
              duration: 'Int',
            },
          },
        },
        interfaces: ['Node'],
      })
    )
  }

  // Add nulled instagram data
  if (!enabledPlugins.includes('gatsby-source-instagram')) {
    typeDefs.push(`
      type InstaNode implements Node @dontInfer  {
        title: String
        localFile: FakeFile
      }
    `)
  }

  // Add nulled youtube data
  if (!enabledPlugins.includes('gatsby-source-youtube-v2')) {
    typeDefs.push(`
      type YoutubeVideo implements Node @dontInfer  {
        videoId: String
        title: String
        localThumbnail: FakeFile
      }
    `)
  }

  createTypes(typeDefs)
}

/**
 * Docs
 */
exports.createPages = async (
  { graphql, actions, getCache },
  { defaultLocale }
) => {
  const { createPage } = actions

  async function createPages() {
    const result = await graphql(
      `
        query DocsQuery {
          allComponentMetadata {
            nodes {
              id
              displayName
              path
              packageName
              filename
            }
          }
        }
      `
    )

    if (result.errors) {
      throw result.errors
    }

    result.data.allComponentMetadata.nodes.map((componentMetadata) => {
      const { id, displayName, path, packageName, filename } = componentMetadata

      createPage({
        path,
        component: resolve(__dirname, `./src/templates/component.js`),
        context: {
          id,
          pageId: `${packageName}/${filename}`,
          displayName,
          title: displayName,
          locale: defaultLocale,
        },
      })
    })
  }
  await createPages()
}
