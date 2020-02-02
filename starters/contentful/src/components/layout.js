import React from 'react'

import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import { useTranslation } from 'react-i18next'

import MenuRecursive from '@gatsby-mdx-suite/menu/menu-recursive'
import { centerToContentColumn } from '@gatsby-mdx-suite/helpers'

const Main = styled.main``

const Footer = styled.footer`
  ${centerToContentColumn}
  padding-top: ${({ theme }) => theme.spacing.s4}px;
`
const FooterMenu = styled.nav``
const FooterCopy = styled.div`
  font-size: 0.9em;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.s1}px;
`

const Layout = ({ children }) => {
  const { t } = useTranslation()

  return (
    <Styled.root>
      <Global
        styles={(theme) => css`
          body {
            margin: 0;
            overflow-x: hidden;
          }
          a {
            color: inherit;
            text-decoration: none;

            :visited {
              color: inherit;
            }

            &.active {
              font-weight: bold;
            }
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          ul,
          ol,
          li {
            &:last-child {
              margin-bottom: 0;
            }
          }
        `}
      />
      <Main>
        {children}
        <Footer>
          <FooterMenu>
            <MenuRecursive rootMenuItemId="74X6wG8uRwdlBSDFxmhTt5" />
          </FooterMenu>
          <FooterCopy>
            {t('copyright', { year: new Date().getFullYear() })}
          </FooterCopy>
        </Footer>
      </Main>
    </Styled.root>
  )
}

Layout.propTypes = {
  children: propTypes.node.isRequired,
}

export default Layout
