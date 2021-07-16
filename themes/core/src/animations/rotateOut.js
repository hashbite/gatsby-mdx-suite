import { css, keyframes as emotionKeyframes } from '@emotion/css'

const keyframes = emotionKeyframes`
  from {
    transform-origin: center;
    opacity: 1;
  }

  to {
    transform-origin: center;
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0;
  }`

const styles = css``

export default { keyframes, styles }
