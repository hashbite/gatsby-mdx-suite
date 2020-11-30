import { css, keyframes as emotionKeyframes } from 'emotion'

const keyframes = emotionKeyframes`
  from {
    transform-origin: center;
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform-origin: center;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }`

const styles = css``

export default { keyframes, styles }
