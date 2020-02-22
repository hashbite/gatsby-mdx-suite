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
    Mdx: {
      // Attach referenced media assets based on the themes collection configuration
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
        type: ['String'],
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

          return DocumentationJsNode.examples.map(({ raw }) => raw)
        },
      },
    },
  }
  createResolvers(resolvers)
}

/**
 * Docs
 */
exports.createPages = async ({ graphql, actions, getCache }) => {
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
          pageTitle: displayName,
        },
      })
    })
  }
  await createPages()
}
