import React from 'react'

import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'

import ColorModeSwitcher from './color-mode-switcher'
import Social from './social'

const Main = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const FloatingMenu = styled.div`
  display: flex;
  /* flex-direction: column; */
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 0;

  & a {
    display: block;
    min-width: 16px;
    width: 2vw;
    padding: ${({ theme }) => theme.spacing.s1}px;
    margin: 0;

    @media (min-width: 600px) {
      padding: ${({ theme }) => theme.spacing.s2}px;
    }
  }

  & svg {
    display: block;
    width: 100%;
  }
`

const Layout = ({ children }) => {
  return (
    <Styled.root>
      <Global
        styles={(theme) => css`
          body {
            margin: 0;
            overflow-x: hidden;

            a {
              color: inherit;
              text-decoration: none;

              :visited {
                color: inherit;
              }
            }

            p a,
            nav a,
            a.more {
              position: relative;

              &:after {
                content: '';
                position: absolute;
                left: -4px;
                right: -4px;
                bottom: -4px;
                height: 4px;
                background: ${theme.colors.text};
                transition: 0.15s height ease-in-out;
                opacity: 0.2;
              }

              &:hover {
                &:after {
                  height: calc(100% + 4px);
                }
              }
            }
          }
        `}
      />
      <Main>{children}</Main>
      <FloatingMenu>
        <Social />
        <ColorModeSwitcher />
      </FloatingMenu>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
