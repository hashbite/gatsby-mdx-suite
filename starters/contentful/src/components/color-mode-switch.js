/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'

import styled from '@emotion/styled'

const SwitcherLink = styled.a`
  display: block;
  cursor: pointer;
  width: 2em;

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
      {mode === 'dark' ? '🔆' : '🌙'}
    </SwitcherLink>
  )
}
