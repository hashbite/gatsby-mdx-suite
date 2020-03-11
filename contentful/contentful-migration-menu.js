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
    .createField('externalUri')
    .name('External URI')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern:
            '^\\w+:\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?$',
        },
      },
    ])
    .disabled(false)
    .omitted(false)

  menuItem
    .createField('internalSlug')
    .name('Internal slug')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

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
    .createField('openInNewTab')
    .name('Open in new tab')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
  menuItem.changeFieldControl('title', 'builtin', 'singleLine', {})

  menuItem.changeFieldControl('linkedPage', 'builtin', 'entryLinkEditor', {
    helpText: 'Actual page this menu item is linking to',
  })

  menuItem.changeFieldControl('externalUri', 'builtin', 'urlEditor', {
    helpText: 'Link an external page.',
  })

  menuItem.changeFieldControl('internalSlug', 'builtin', 'singleLine', {
    helpText:
      'Link hardcoded internal projects. Only use as last resort, always prefer to link pages.',
  })

  menuItem.changeFieldControl('subitems', 'builtin', 'entryLinksEditor', {
    bulkEditing: true,
  })

  menuItem.changeFieldControl('openInNewTab', 'builtin', 'boolean', {
    helpText:
      'Open link in a new browser tab. Should only be used for edge-cases. See https://css-tricks.com/use-target_blank/',
    trueLabel: 'Yes',
    falseLabel: 'No',
  })
}
