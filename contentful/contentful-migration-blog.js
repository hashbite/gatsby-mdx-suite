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
    .createField('publishingDate')
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

  
  blogPost
    .createField('imagesContent')
    .name('Content Images')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
        },
      ],

      linkType: 'Asset',
    })

  blogPost.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'For browser tab title, search engine results & social media cards. No longer than 60-70 characters.',
  })

  blogPost.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'URL identifier for this page. If you change this later one, you might harm your SEO score.',
  })

  blogPost.changeFieldControl('publishingDate', 'builtin', 'datePicker', {
    ampm: '24',
    format: 'timeZ',
    helpText:
      'Set the public publishing date for this blog post. Will be displayed to the user and used for ordering.',
  })

  blogPost.changeFieldControl('metaDescription', 'builtin', 'singleLine', {
    helpText:
      'Description which will be used on search engine result pages and when this page is shared in social media.',
  })

  blogPost.changeFieldControl('image', 'builtin', 'assetLinkEditor', {
    helpText:
      'This image is used for teasers, when this blog post is shared on search machines and might be shown in the header of the detail page.',
  })

  blogPost.changeFieldControl('teaser', 'builtin', 'markdown', {
    helpText:
      'This text is used for teasers, especially on the blog post listing page. You can use any text formatting, but keep this short.',
  })

  blogPost.changeFieldControl('content', 'builtin', 'markdown', {
    helpText: 'The actual content of this blog post.',
  })

  blogPost.changeFieldControl('imagesContent', 'builtin', 'assetGalleryEditor', {
    helpText: 'Add all images that will be shown within the content.',
  })
}
