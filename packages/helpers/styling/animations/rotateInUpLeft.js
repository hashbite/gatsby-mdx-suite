import { css, keyframes as emotionKeyframes } from 'emotion'

const keyframes = emotionKeyframes`
  from {
    transform-origin: left bottom;
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform-origin: left bottom;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }`

const styles = css``

export default { keyframes, styles }
