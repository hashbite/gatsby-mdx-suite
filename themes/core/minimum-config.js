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
        save: 'save',
        open: 'open',
        close: 'close',
        next: 'next',
        previous: 'previous',
        first: 'first',
        last: 'last',
        newsReadMore: 'Read more...',
        newsTimeToRead: '{{minutes}} min. to read',
        privacyManagerPrivacyModeEnabled: 'privacy mode is on',
        privacyManagerHeadline: 'Your privacy is important to us!',
        privacyManagerDescription:
          'This website stores data such as cookies to enable necessary site functionality, anonymous analytics, and embedding of external services for videos, maps and more. You may change your settings at any time.',
      },
    },
    de: {
      translation: {
        copyright: '© Copyright {{year}}. Alle Rechte vorbehalten.',
        save: 'Speichern',
        open: 'Öffnen',
        close: 'Schließen',
        next: 'Weiter',
        previous: 'Zurück',
        first: 'Anfang',
        last: 'Ende',
        newsReadMore: 'Weiterlesen...',
        newsTimeToRead: '{{minutes}} Min. Lesezeit',
        privacyManagerPrivacyModeEnabled: 'Datenschutzmodus aktiviert',
        privacyManagerHeadline: 'Der Schutz Ihrer Daten ist uns wichtig!',
        privacyManagerDescription:
          'Diese Website speichert Daten unter Anderem in Form von Cookies. Diese ermöglichen wichtige Funktionen dieser Website, anonyme Webanalyse sowie die Einbindung externer Anbieter für Videos, Karten und weiteres. Sie können die Einstellungen jederzeit ändern.',
      },
    },
  },
  // This can get very messy. Might be replaced. See:  https://github.com/axe312ger/gatsby-mdx-suite/issues/38
  mediaCollections: {
    screen: {
      selector: [
        'Section[backgroundImageId]',
        'Section[backgroundVideoId]',
        'Header[backgroundImageId]',
        'Header[backgroundVideoId]',
        'Image[id][contextKey="screen"]',
        'Video[id][contextKey="screen"]',
        'Video:not([contextKey])',
      ].join(','),
      /**
       * @param el See: https://github.com/cheeriojs/cheerio#the-dom-node-object
       */
      attribute: (el) => {
        switch (el.name) {
          case 'header':
            return el.attribs.backgroundvideoid
              ? 'backgroundvideoid'
              : 'backgroundimageid'
          case 'section':
            return el.attribs.backgroundvideoid
              ? 'backgroundvideoid'
              : 'backgroundimageid'
          case 'image':
          case 'video':
            return 'id'
          default:
            return 'backgroundimageid'
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
