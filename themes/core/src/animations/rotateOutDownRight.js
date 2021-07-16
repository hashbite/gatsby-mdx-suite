import { css, keyframes as emotionKeyframes } from '@emotion/css'

const keyframes = emotionKeyframes`
  from {
    transform-origin: right bottom;
    opacity: 1;
  }

  to {
    transform-origin: right bottom;
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }`

const styles = css``

export default { keyframes, styles }
