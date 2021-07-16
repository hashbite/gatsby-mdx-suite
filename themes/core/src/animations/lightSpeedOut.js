import { css, keyframes as emotionKeyframes } from '@emotion/css'

const keyframes = emotionKeyframes`
  from {
    opacity: 1;
  }

  to {
    transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0;
  }`

const styles = css`
  animation-timing-function: ease-in;
`

export default { keyframes, styles }
