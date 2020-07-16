const { resolve } = require('path')
const { createPath } = require('@gatsby-mdx-suite/helpers/routing')

exports.createPages = async ({ graphql, actions, getCache }) => {
  const { createPage, createRedirect } = actions
  const { config } = await getCache().get('mdx-suite')

  async function createPages() {
    const result = await graphql(
      `
        {
          allContentfulPage(limit: 1000) {
            nodes {
              id
              pageId: contentful_id
              locale: node_locale
              slug
              title
            }
          }
        }
      `
    )

    if (result.errors) {
      throw result.errors
    }

    result.data.allContentfulPage.nodes.map((node) => {
      const { id, pageId, locale, slug, title } = node

      // Ensure we do not overwrite out blog post listing
      if (slug === 'blog') {
        return
      }

      const path = createPath({ slug, locale, config })

      createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          id,
          /* Add this when creating pages to allow proper generation of page urls */
          pageId,
          locale,
          title,
        },
      })
    })
  }

  // As we alias the slug `index` to ``, we should redirect users to the start page (e.G. when using Gatsby Cloud Preview)
  createRedirect({
    fromPath: '/index',
    toPath: '/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  // Add a redirect from to your default language if you won't serve / directly
  // createRedirect({ fromPath: '/', toPath: '/de', isPermanent: true, redirectInBrowser: true })

  await createPages()
}
