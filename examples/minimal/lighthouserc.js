module.exports = {
  ci: {
    collect: {
      url: ['/'],
      numberOfRuns: 3,
      staticDistDir: './public',
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: process.env.LHCI_SERVER,
      token: process.env.LHCI_TOKEN,
      basicAuth: {
        username: process.env.LHCI_USER,
        password: process.env.LHCI_PASSWORD,
      },
    },
  },
}
