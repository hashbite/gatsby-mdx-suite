import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Ensure user gets the latest content as soon updates are ready
// Might prevent: https://github.com/gatsbyjs/gatsby/issues/13410
// @todo really still needed with offline plugin v3? this can be pretty annoying
export const onServiceWorkerUpdateReady = () => window.location.reload(true)
