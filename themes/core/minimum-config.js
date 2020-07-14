module.exports = {
  pageTypeMap: {
    page: null,
  },
  langs: ['en-US'],
  defaultLocale: 'en-US',
  localeMap: {
    'en-US': '',
  },
  translations: {},
  mediaCollections: {
    screen: {
      selector: [
        'Section[backgroundImageId]',
        'Viewport[backgroundImageId]',
        'Header[backgroundImageId]',
        'Image[id][contextKey="screen"]',
      ].join(','),
      /**
       * @param el See: https://github.com/cheeriojs/cheerio#the-dom-node-object
       */
      attribute: (el) => {
        switch (el.name) {
          case 'image':
            return 'id'
          default:
            return 'backgroundImageId'
        }
      },
    },
    full: {
      selector: [
        'Image[id][contextKey="full"]',
        'Image:not([contextKey])',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    half: {
      selector: ['Image[id][contextKey="half"]'].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    third: {
      selector: ['Image[id][contextKey="third"]'].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    quarter: {
      selector: ['Image[id][contextKey="quarter"]'].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    sixth: {
      selector: ['Image[id][contextKey="sixth"]'].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    eight: {
      selector: ['Image[id][contextKey="eight"]'].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
  },
}
