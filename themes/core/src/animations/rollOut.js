/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */

import { css, keyframes as emotionKeyframes } from '@emotion/react'

const keyframes = emotionKeyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
  }`

const styles = css``

export default { keyframes, styles }
