const { resolve } = require('path')
const { createPath } = require('@gatsby-mdx-suite/i18n/helpers')

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
                contentful_id
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
      const { id, contentful_id: pageId, slug, node_locale: locale } = edge.node

      const path = createPath({ slug, locale })

      createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          id,
          pageId,
          locale,
        },
      })
    })
  }

  await createPages()
}
