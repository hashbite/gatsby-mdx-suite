/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'

import IconLight from 'svg-icon/dist/svg/weather/day-sunny.svg'
import IconDark from 'svg-icon/dist/svg/weather/night-clear.svg'
import styled from '@emotion/styled'

const SwitcherLink = styled.a`
  display: block;
  cursor: pointer;

  svg {
    display: block;
    margin: 0 auto;

    path {
      fill: ${({ theme }) => theme.colors.text};
      opacity: 0.4;
      transition: 0.3s any linear;
    }

    :hover path {
      fill: ${({ theme }) => theme.colors.contrast};
      opacity: 1;
    }
  }
`

export default (props) => {
  const [mode, setMode] = useColorMode()
  return (
    <SwitcherLink
      {...props}
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
    >
      {mode === 'dark' ? <IconLight /> : <IconDark />}
    </SwitcherLink>
  )
}
