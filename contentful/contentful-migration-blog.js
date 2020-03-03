module.exports = function(migration) {
  const blogPost = migration
    .createContentType('blogPost')
    .name('Blog Posttml')
    .description('')
    .displayField('title')
  blogPost
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  blogPost
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false)

  blogPost
    .createField('publicationDate')
    .name('Publishing date')
    .type('Date')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  blogPost
    .createField('image')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  blogPost
    .createField('metaDescription')
    .name('Meta Description')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 155,
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  blogPost
    .createField('teaser')
    .name('Teaser')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  blogPost
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  blogPost.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'Set a title for the browser tab, search engine results & social media shares. No longer than 60-70 characters.',
  })

  blogPost.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'Set the URL identifier for this page. If you change this later one, you might harm your SEO score. The whole URL should have a maximum of 55-60 characters. This includes the domain name. NOTE: Use "index" to identify the home page.',
  })

  blogPost.changeFieldControl('publicationDate', 'builtin', 'datePicker', {
    ampm: '24',
    format: 'timeZ',
    helpText:
      'Set the public publication date for this blog post. It will be displayed to the user based on their regional standard. Used to order the blog posts on the overview page as well.',
  })

  blogPost.changeFieldControl('metaDescription', 'builtin', 'singleLine', {
    helpText:
      'The meta description will be used for search engine result pages and when sharing the page on social media.',
  })

  blogPost.changeFieldControl('metaImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'The meta image is used as a preview image for the page, especially when shared on social media and in chat clients. Renders the best when the resolution is at least 1200px by 630px.',
  })

  blogPost.changeFieldControl('teaser', 'builtin', 'markdown', {
    helpText:
      'The content of the blog posts preview. Keep it short. Use MDX syntax to add layout and design to the page. See the documentation of the project for more information about MDX.',
  })

  page.changeFieldControl('content', 'builtin', 'markdown', {
    helpText:
      'The actual content. Use MDX syntax to add layout and design to the page. See the documentation of the project for more information about MDX.',
  })
}
