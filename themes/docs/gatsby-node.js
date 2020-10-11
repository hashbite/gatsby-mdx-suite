const { resolve } = require('path')

const REGEX_DEPENDENCY_COMPONENT = /node_modules\/(@[^\\/]+\/[^@\\/]+|[^@\\/]+)\//

const generateComponentSlug = ({ packageName, parentName }) =>
  encodeURIComponent([packageName, parentName].filter((v) => !!v).join('/'))
    .replace(/%2F/g, '/')
    .replace(/%40/g, '')
    .toLowerCase()

exports.createResolvers = ({ createResolvers }, { mediaCollections = {} }) => {
  const resolvers = {
    ComponentMetadata: {
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

exports.createPages = async ({ graphql, actions, getCache }) => {
  const { createPage } = actions
  const cache = getCache()
  const coreConfig = await cache.get('mdx-suite')

  const { defaultLocale } = coreConfig.config

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

    result.data.allComponentMetadata.nodes.forEach((componentMetadata) => {
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
