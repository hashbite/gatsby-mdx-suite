const { resolve } = require('path')
const createPath = require('@gatsby-mdx-suite/i18n/create-path')

const crypto = require(`crypto`)

const axios = require(`axios`)
const { GraphQLString } = require('gatsby/graphql')
const { default: PQueue } = require('p-queue')
const SVGO = require('svgo')

const queue = new PQueue({
  concurrency: 5,
})

// do we really need this? :(
const sessionCache = {}

// This was already extracted to https://github.com/axe312ger/gatsby-transformer-inline-svg but did not work for some reason
// If you read this, its probably time to give it another try over there ;)
exports.setFieldsOnGraphQLNodeType = ({ type, cache }) => {
  if (type.name === `ContentfulAsset`) {
    return {
      svgContent: {
        type: GraphQLString,
        resolve: async (source) => {
          // Catch empty Contentful assets
          if (!source.file) {
            return null
          }
          const { contentType, url } = source.file

          if (contentType !== 'image/svg+xml') {
            return null
          }

          const cacheId =
            'contentful-svg-content-' +
            crypto
              .createHash(`md5`)
              .update(url)
              .digest(`hex`)

          const result = await queue.add(async () => {
            try {
              if (sessionCache[cacheId]) {
                return sessionCache[cacheId]
              }

              const cachedData = await cache.get(cacheId)

              if (cachedData) {
                return cachedData
              }

              // Download image from contentful
              console.log('Downloading ' + url)

              const response = await axios({
                method: `get`,
                url: `http:${url}`,
                responseType: `document`,
              })

              if (!response.data) {
                console.log('Unable to download or empty ' + url)
                return null
              }

              // SVGs with pixel data with embedded images should not be rendered inline
              if (response.data.indexOf('base64') !== -1) {
                console.log(
                  'Contains pixel data:',
                  source.contentful_id + ': ' + url
                )
                response.data = null
              }

              // Optimize
              const svgo = new SVGO({
                multipass: true,
                floatPrecision: 2,
                plugins: [
                  { removeDoctype: true },
                  { removeXMLProcInst: true },
                  { removeComments: true },
                  { removeMetadata: true },
                  { removeXMLNS: false },
                  { removeEditorsNSData: true },
                  { cleanupAttrs: true },
                  { inlineStyles: true },
                  { minifyStyles: true },
                  { convertStyleToAttrs: true },
                  { cleanupIDs: true },
                  { prefixIds: true },
                  { removeRasterImages: true },
                  { removeUselessDefs: true },
                  { cleanupNumericValues: true },
                  { cleanupListOfValues: true },
                  { convertColors: true },
                  { removeUnknownsAndDefaults: true },
                  { removeNonInheritableGroupAttrs: true },
                  { removeUselessStrokeAndFill: true },
                  { removeViewBox: false },
                  { cleanupEnableBackground: true },
                  { removeHiddenElems: true },
                  { removeEmptyText: true },
                  { convertShapeToPath: true },
                  { moveElemsAttrsToGroup: true },
                  { moveGroupAttrsToElems: true },
                  { collapseGroups: true },
                  { convertPathData: true },
                  { convertTransform: true },
                  { removeEmptyAttrs: true },
                  { removeEmptyContainers: true },
                  { mergePaths: true },
                  { removeUnusedNS: true },
                  { sortAttrs: true },
                  { removeTitle: true },
                  { removeDesc: true },
                  { removeDimensions: true },
                  { removeAttrs: false },
                  { removeAttributesBySelector: false },
                  { removeElementsByAttr: false },
                  { addClassesToSVGElement: false },
                  { removeStyleElement: false },
                  { removeScriptElement: false },
                  { addAttributesToSVGElement: false },
                  { removeOffCanvasPaths: true },
                  { reusePaths: true },
                ],
              })
              const { data: optimizedSVG } = await svgo.optimize(response.data)

              sessionCache[cacheId] = optimizedSVG
              await cache.set(cacheId, optimizedSVG)

              console.log('Processed and cached ' + url)
              return optimizedSVG
            } catch (err) {
              console.error(err)
              return null
            }
          })

          return result
        },
      },
    }
  }

  // by default return empty object
  return {}
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  async function createPages() {
    const result = await graphql(
      `
        {
          allContentfulPage(limit: 1000) {
            edges {
              node {
                id
                slug
                node_locale
              }
            }
          }
        }
      `
    )

    if (result.errors) {
      throw result.errors
    }

    result.data.allContentfulPage.edges.map((edge) => {
      const { id, slug, node_locale: locale } = edge.node

      const path = createPath({ slug, locale })

      createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          id: id,
          locale,
        },
      })

      // Make sure entry route is always available. Ensure you render cannocical links to avoid content duplication.
      if (slug === 'index') {
        createPage({
          path: '/',
          component: resolve(`./src/templates/page.js`),
          context: {
            id: id,
            locale,
          },
        })
      }
    })
  }

  await createPages()
}
