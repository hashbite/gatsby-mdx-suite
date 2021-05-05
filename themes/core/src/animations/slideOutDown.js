import { css, keyframes as emotionKeyframes } from '@emotion/react'

const keyframes = emotionKeyframes`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }`

const styles = css``

export default { keyframes, styles }
