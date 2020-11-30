import { css, keyframes as emotionKeyframes } from 'emotion'

const keyframes = emotionKeyframes`
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }`

const styles = css`
  animation-duration: 1.3s;
  animation-timing-function: ease-in-out;
`

export default { keyframes, styles }
