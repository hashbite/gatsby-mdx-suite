import { css, keyframes as emotionKeyframes } from '@emotion/css'

const keyframes = emotionKeyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }`

const styles = css``

export default { keyframes, styles }
