module.exports = function (migration) {
  const page = migration
    .createContentType('page')
    .name('Page')
    .description('')
    .displayField('title')

  page
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        size: {
          max: 70,
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  page
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  page
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

  page
    .createField('metaImage')
    .name('Meta Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ['image'],
      },
      {
        assetImageDimensions: {
          width: {
            min: 1200,
            max: null,
          },
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  page
    .createField('content')
    .name('Content')
    .type('Text')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  page.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText:
      'Set a title for the browser tab, search engine results & social media shares. No longer than 60-70 characters.',
  })

  page.changeFieldControl('slug', 'builtin', 'slugEditor', {
    helpText:
      'Set the URL identifier for this page. If you change this later one, you might harm your SEO score. The whole URL should have a maximum of 55-60 characters. This includes the domain name. NOTE: Use "index" to identify the home page.',
  })

  page.changeFieldControl('metaDescription', 'builtin', 'singleLine', {
    helpText:
      'Description which will be used on search engine result pages and when this page is shared in social media.',
  })

  page.changeFieldControl('metaImage', 'builtin', 'assetLinkEditor', {
    helpText:
      'Used as preview image, especially when shared in social media. At best in 1200px by 630px.',
  })
}
