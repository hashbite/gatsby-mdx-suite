const { writeFile } = require('fs-extra')
const { resolve } = require('path')
const cheerio = require('cheerio')
const Debug = require('debug')
const merge = require('lodash/merge')
const toTailwind = require('@theme-ui/tailwind')

const minimumConfig = require('./minimum-config')

const debug = Debug('gatsby-theme-mdx-suite')

/**
 * Ensure @mdx-js dependencies build via webpack
 * @todo still needed?
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
  })
}

/**
 * Convert Theme-UI config to TailwindCSS config.
 *
 *
 * This is a workaround as theme-ui config is supplied as es modules and
 * twin.macro expects its config file in ES5 standard.
 *
 * In a perfect world (e.G. node fully supports es modules out of the box)
 * we can remove this file and use toTailwind(ourTheme) in tailwind.config.js
 */
exports.onPreInit = async ({ reporter }, { themeUiConfig = {} }) => {
  reporter.info('Converting Theme UI config to TailwindCSS config')

  const tailwindTheme = toTailwind(themeUiConfig).theme.default

  tailwindTheme.colors = Object.keys(tailwindTheme.colors).reduce(
    (colors, color) => {
      const palette = tailwindTheme.colors[color]
      const convertedPalette = Array.isArray(palette)
        ? palette
            .filter(Boolean)
            .reduce((map, shade, i) => ({ ...map, [(i + 1) * 100]: shade }), {})
        : palette

      return { ...colors, [color]: convertedPalette }
    },
    {}
  )

  const configFileContent = `module.exports = ${JSON.stringify(
    { theme: { extend: { ...tailwindTheme } } },
    null,
    2
  )}`

  const configFilePath = resolve(process.cwd(), 'tailwind.config.js')

  await writeFile(configFilePath, configFileContent)

  reporter.info('./tailwind.config.js updated')
}

/**
 * Allow all plugins and the actual page access the theme config
 */
exports.onPreBootstrap = async ({ getCache }, themeConfig) => {
  const cache = getCache()
  await cache.set('mdx-suite', { config: merge(minimumConfig, themeConfig) })
}

exports.createResolvers = ({ createResolvers }, themeConfig) => {
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

/**
 * Create dummy types to allow queries to succeed even without data.
 *
 * @todo Reinvestigate how much/what we need
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
    `
    type FakeSvg implements Node {
      content: String
    }
    `,
    `
    type ContentfulAsset implements Node {
      svg: FakeSvg
    }
    `,
  ]

  // Make gatsby-transformer-video optional
  if (!enabledPlugins.includes('gatsby-transformer-video')) {
    typeDefs.push(`
      type FakeScreenshots implements Node @dontInfer {
          path: String
      }
    `)
    typeDefs.push(`
      type FakeVideo implements Node @dontInfer  {
        path: String
        screenshots: FakeScreenshots
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
              maxWidth: 'Int',
              screenshots: 'String',
            },
          },
        },
        interfaces: ['Node'],
      })
    )
  }

  // Add nulled instagram data
  // @todo still needed even when instagram is not used?
  if (!enabledPlugins.includes('gatsby-source-instagram')) {
    typeDefs.push(`
      type InstaNode implements Node @dontInfer  {
        title: String
        localFile: FakeFile
      }
    `)
  }

  // Add nulled youtube data
  // @todo still needed even when youtube is not used?
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
