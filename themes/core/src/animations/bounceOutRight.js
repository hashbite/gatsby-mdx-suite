import { css, keyframes as emotionKeyframes } from '@emotion/css'

const keyframes = emotionKeyframes`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }`

const styles = css``

export default { keyframes, styles }
