import Logo from 'gatsby-theme-mdx-suite-base/src/assets/logo.svg'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

// Use this extra file for dynamic logos or when you can not use SVGs.
// Otherwise just shadow the svg from above.

const rainbow = keyframes`
  0% {
   color: #000;
  }

  25% {
    color: #15d;
  }

  50% {
    color: #02ac1e;
  }

  75% {
    color: #b1ab1a;
  }

  100% {
    color: #b000b5;
  }
`

const AnimatedLogo = styled(Logo)`
  color: red;
  animation: ${rainbow} 12s linear infinite alternate;
`

export default AnimatedLogo
