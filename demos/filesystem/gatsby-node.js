const { resolve } = require(`path`)
const { createPath } = require(`./src/helpers`)

// @todo find out if we can enable/disable i18n properly via a flag in theme config

const defaultLocale = '' // set to null to remove locale from paths

exports.onCreateNode = (all) => {
  const { node, actions } = all
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const {
      frontmatter: { slug: frontmatterSlug },
      fileAbsolutePath,
    } = node

    // Extract human identifier and locale from the file path
    const pathRegex = /\/([^/]+?)(?:\.([a-z-]+))?\.mdx?$/i

    try {
      const [result, humanId, locale] = pathRegex.exec(fileAbsolutePath)

      if (!result) {
        throw new Error(
          'Regex to extract humand id and locale returned nothing. Please follow pattern'
        )
      }

      createNodeField({
        name: 'id',
        node,
        value: node.id,
      })

      createNodeField({
        name: 'locale',
        node,
        // Fallback to default locale if locale was forgotten by author
        value: locale || defaultLocale,
      })

      createNodeField({
        name: 'humanId',
        node,
        value: humanId,
      })

      createNodeField({
        name: 'slug',
        node,
        // Fallback to human id when slug was forgotten by author
        value: frontmatterSlug || humanId,
      })

      createNodeField({
        name: 'title',
        node,
        value: node.frontmatter.title || humanId,
      })

      createNodeField({
        name: 'description',
        node,
        value: node.frontmatter.description || '',
      })

      createNodeField({
        name: 'date',
        node,
        value: node.frontmatter.date || '',
      })
    } catch (err) {
      err.message = [
        `Unable to extract metadata from path "${fileAbsolutePath}"`,
        err.message,
      ]
        .filter(Boolean)
        .join('\n\n')
      throw err
    }
  }
}

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [fields___date] }) {
        edges {
          node {
            id
            fileAbsolutePath
            fields {
              slug
              locale
            }
            parent {
              ... on File {
                sourceInstanceName
              }
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    const { edges } = data.allMdx

    edges.forEach((edge) => {
      const {
        id,
        fields: { slug, locale },
        parent: { sourceInstanceName },
      } = edge.node

      const prefix = sourceInstanceName !== 'page' ? sourceInstanceName : null

      const path = createPath({
        prefix,
        slug,
        locale,
      })

      actions.createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          id,
        },
      })
    })
  })
