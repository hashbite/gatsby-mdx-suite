module.exports = function(migration) {
  const menuItem = migration
    .createContentType('menuItem')
    .name('Menu Item')
    .description('')
    .displayField('title')
  menuItem
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  menuItem
    .createField('linkedPage')
    .name('Linked Page')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['page'],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType('Entry')

  menuItem
    .createField('subitems')
    .name('Subitems')
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
          linkContentType: ['menuItem'],
        },
      ],

      linkType: 'Entry',
    })

  menuItem
    .createField('hiddenOnMobile')
    .name('Hidden on mobile')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  menuItem.changeFieldControl('title', 'builtin', 'singleLine', {})
  menuItem.changeFieldControl('linkedPage', 'builtin', 'entryLinkEditor', {})

  menuItem.changeFieldControl('subitems', 'builtin', 'entryLinksEditor', {
    bulkEditing: true,
  })

  menuItem.changeFieldControl('hiddenOnMobile', 'builtin', 'boolean', {})
}
