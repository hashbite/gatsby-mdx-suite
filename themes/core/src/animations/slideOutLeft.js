import { css, keyframes as emotionKeyframes } from '@emotion/css'

const keyframes = emotionKeyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }`

const styles = css``

export default { keyframes, styles }
