module.exports = {
  pageTypeMap: {
    page: null,
  },
  langs: ['en-US'],
  defaultLocale: 'en-US',
  localeMap: {
    'en-US': '',
  },
  translations: {
    'en-US': {
      translation: {
        copyright: '© Copyright {{year}}. All rights reserved.',
        open: 'open',
        close: 'close',
        next: 'next',
        previous: 'previous',
        first: 'first',
        last: 'last',
        '404PageTitle': '404 - Not Found',
        '404PageDescription': 'This page does not exist.',
        newsReadMore: 'Read more...',
        newsTimeToRead: '{{minutes}} min. to read',
      },
    },
    de: {
      translation: {
        copyright: '© Copyright {{year}}. Alle Rechte vorbehalten.',
        open: 'Öffnen',
        close: 'Schließen',
        next: 'Weiter',
        previous: 'Zurück',
        first: 'Anfang',
        last: 'Ende',
        '404PageTitle': '404 - Not Found',
        '404PageDescription': 'Diese Seite existiert leider nicht.',
        newsReadMore: 'Weiterlesen...',
        newsTimeToRead: '{{minutes}} Min. Lesezeit',
      },
    },
  },
  // This can get very messy. Might be replaced. See:  https://github.com/axe312ger/gatsby-mdx-suite/issues/38
  mediaCollections: {
    screen: {
      selector: [
        'Section[backgroundImageId]',
        'Section[backgroundVideoId]',
        'Viewport[backgroundImageId]',
        'Header[backgroundImageId]',
        'Image[id][contextKey="screen"]',
        'Video[id][contextKey="screen"]',
        'Video:not([contextKey])',
      ].join(','),
      /**
       * @param el See: https://github.com/cheeriojs/cheerio#the-dom-node-object
       */
      attribute: (el) => {
        switch (el.name) {
          case 'section':
            return el.attribs.backgroundvideoid
              ? 'backgroundvideoid'
              : 'backgroundimageid'
          case 'image':
          case 'video':
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
        'Video[id][contextKey="full"]',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    half: {
      selector: [
        'Image[id][contextKey="half"]',
        'Video[id][contextKey="half"]',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    third: {
      selector: [
        'Image[id][contextKey="third"]',
        'Video[id][contextKey="third"]',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    quarter: {
      selector: [
        'Image[id][contextKey="quarter"]',
        'Video[id][contextKey="quarter"]',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    sixth: {
      selector: [
        'Image[id][contextKey="sixth"]',
        'Video[id][contextKey="sixth"]',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
    eight: {
      selector: [
        'Image[id][contextKey="eight"]',
        'Video[id][contextKey="eight"]',
      ].join(','),
      attribute: (el) => {
        switch (el.name) {
          default:
            return 'id'
        }
      },
    },
  },
}
