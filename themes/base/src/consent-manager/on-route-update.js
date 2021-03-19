/**
 * This is based on:
 * https://github.com/kremalicious/gatsby-plugin-matomo/blob/main/src/gatsby-browser.js
 */

const { getMatomoTracker } = require('@consent-manager/integration-matomo')

module.exports = (function () {
  return {
    onRouteUpdate({ location, prevLocation }) {
      const { trackPageViewSPA } = getMatomoTracker()

      // This ensures plugins like react-helmet finished their work
      window.setTimeout(() => {
        const trackResult = trackPageViewSPA({ location, prevLocation })

        // Debug logging
        if (process.env.gatsby_log_level === `verbose`) {
          const { url, title } = trackResult
          if (!trackResult) {
            return console.debug(
              `[Matomo] Failed to track page view: ${url} - ${title}`
            )
          }
          console.debug(`[Matomo] Page view for: ${url} - ${title}`)
        }
      }, 0)
    },
  }
})()
