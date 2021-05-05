import { css, keyframes as emotionKeyframes } from '@emotion/react'

const keyframes = emotionKeyframes`
  from {
    transform-origin: right bottom;
    transform: rotate3d(0, 0, 1, -90deg);
    opacity: 0;
  }

  to {
    transform-origin: right bottom;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }`

const styles = css``

export default { keyframes, styles }
