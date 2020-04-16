module.exports = function (migration) {
  const blogPost = migration
    .createContentType('blogPost')
    .name('Blog Post')
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
    .name('Publication Date')
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
      'Set the URL identifier for this page. If you change this later one, you might harm your SEO score. The whole URL should have a maximum of 55-60 characters. This includes the domain name.',
  })

  blogPost.changeFieldControl('publicationDate', 'builtin', 'datePicker', {
    ampm: '24',
    format: 'timeZ',
    helpText:
      'Set the public publication date for this blog post. Will be displayed to the user and used for ordering.',
  })

  blogPost.changeFieldControl('image', 'builtin', 'assetLinkEditor', {
    helpText:
      'This image is used for teasers, when this blog post is shared on search machines and might be shown in the header of the detail page.',
  })

  blogPost.changeFieldControl('metaDescription', 'builtin', 'singleLine', {
    helpText:
      'Description which will be used on search engine result pages and when this page is shared in social media.',
  })

  blogPost.changeFieldControl('teaser', 'builtin', 'markdown', {
    helpText:
      'Teaser/preview content, especially used on the blog post overview page. Use MDX syntax to add layout and design to the page. See the documentation of the project for more information about MDX.',
  })

  blogPost.changeFieldControl('content', 'builtin', 'markdown', {
    helpText:
      'The actual content. Use MDX syntax to add layout and design to the page. See the documentation of the project for more information about MDX.',
  })
}
