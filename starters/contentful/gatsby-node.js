const { resolve } = require('path')
const { createPath } = require('@gatsby-mdx-suite/i18n/helpers')

exports.createPages = async ({ graphql, actions, getCache }) => {
  const { createPage } = actions
  const { config } = await getCache().get('mdx-suite')

  async function createPages() {
    const result = await graphql(
      `
        {
          allContentfulPage(limit: 1000) {
            edges {
              node {
                id
                pageId: contentful_id
                locale: node_locale
                slug
                title
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
      const { id, pageId, locale, slug, title } = edge.node

      const path = createPath({ slug, locale, config })

      createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          id,
          pageId,
          locale,
          title,
        },
      })
    })
  }

  await createPages()
}
