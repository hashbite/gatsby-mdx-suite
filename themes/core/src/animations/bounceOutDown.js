import { css, keyframes as emotionKeyframes } from '@emotion/react'

const keyframes = emotionKeyframes`
  20% {
    transform: translate3d(0, 10px, 0);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }`

const styles = css``

export default { keyframes, styles }
