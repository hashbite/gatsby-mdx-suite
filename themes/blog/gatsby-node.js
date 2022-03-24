const { resolve } = require('path')
const { createPath } = require('@gatsby-mdx-suite/helpers/routing')
const { paginate } = require('gatsby-awesome-pagination')

const merge = require('deepmerge')

exports.createPages = async ({ graphql, actions, getCache }, themeConfig) => {
  const options = merge({ itemsPerPage: 6 }, themeConfig)
  const { createPage } = actions
  const { config } = await getCache().get('mdx-suite')

  const result = await graphql(`
    {
      allContentfulContentTypeBlogPost(
        sort: { fields: publicationDate, order: DESC }
      ) {
        nodes {
          id
          sys {
            pageId: id
            locale: locale
          }
          slug
          title
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create blog post pages
  result.data.allContentfulContentTypeBlogPost.nodes.forEach((node) => {
    const { id, pageId, locale, slug, title } = node

    const path = createPath({ slug, locale, config, pageType: 'blogPost' })

    createPage({
      path,
      component: resolve(__dirname, `./src/templates/blog-post.js`),
      context: {
        id,
        /* Add this when creating pages to allow proper generation of page urls */
        pageId,
        locale,
        title,
      },
    })
  })

  // Create blog post listing pages
  config.langs.forEach((locale) => {
    const localizedBlogPosts =
      result.data.allContentfulContentTypeBlogPost.nodes.filter(
        (post) => post.locale === locale
      )
    paginate({
      createPage,
      items: localizedBlogPosts,
      itemsPerPage: options.itemsPerPage,
      pathPrefix: createPath({ slug: 'blog', locale, config }),
      component: resolve(__dirname, `./src/templates/blog-post-list.js`),
      context: {
        pageId: `blog-post-listing`,
        locale,
        title: `Blog`,
      },
    })
  })
}
