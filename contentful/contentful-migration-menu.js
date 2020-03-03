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

  menuItem.changeFieldControl('title', 'builtin', 'singleLine', {
    helpText: 'Set the title for this menu item.',
  })

  menuItem.changeFieldControl('linkedPage', 'builtin', 'entryLinkEditor', {
    helpText: 'Select an internal page to link to.',
  })

  menuItem.changeFieldControl('subitems', 'builtin', 'entryLinksEditor', {
    bulkEditing: true,
    helpText: 'Reference all sub items of this menu item.',
  })
}
