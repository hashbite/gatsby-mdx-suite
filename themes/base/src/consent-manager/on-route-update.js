/**
 * This is based on:
 * https://github.com/kremalicious/gatsby-plugin-matomo/blob/main/src/gatsby-browser.js
 */

const { getMatomoTracker } = require('@consent-manager/integration-matomo')

module.exports = (function () {
  return {
    onRouteUpdate({ location, prevLocation }) {
      const { track } = getMatomoTracker()

      const url =
        location && location.pathname + location.search + location.hash
      const prevUrl =
        prevLocation &&
        prevLocation.pathname + prevLocation.search + prevLocation.hash

      // @todo this cound be a helper function in the getMatomoTracker for SPAs
      const sendPageView = () => {
        const { title } = document

        prevUrl && track('setReferrerUrl', prevUrl)
        track('setCustomUrl', url)
        track('setDocumentTitle', title)
        track('trackPageView')
        track('enableLinkTracking')
        track('trackAllContentImpressions')

        if (process.env.gatsby_log_level === `verbose`) {
          console.debug(`[Matomo] Page view for: ${url} - ${title}`)
        }
      }

      // This ensures plugins like react-helmet finished their work
      window.setTimeout(sendPageView, 0)
    },
  }
})()
