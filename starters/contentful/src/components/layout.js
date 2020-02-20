import React from 'react'

import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import { useTranslation } from 'react-i18next'

import MenuRecursive from '@gatsby-mdx-suite/menu/menu-recursive'
import MenuUl from '@gatsby-mdx-suite/menu/menu-ul'
import MenuLi from '@gatsby-mdx-suite/menu/menu-li'
import MenuTitle from '@gatsby-mdx-suite/menu/menu-title'
import { centerToContentColumn } from '@gatsby-mdx-suite/helpers'

import tw from 'twin.macro'

const Main = styled.main`
  ${tw`flex flex-col min-h-screen`}
`

const Content = styled.div`
  flex: 1 1 auto;
`

const Footer = styled.footer`
  flex: 0 0 auto;
  ${centerToContentColumn}
`
const FooterMenu = styled.nav`
  padding-top: ${({ theme }) => theme.spacing.s4}px;
  justify-content: space-between;

  & > ${MenuUl} {
    & > li > ${MenuTitle} {
      font-weight: bold;
      opacity: 0.6;
      padding-bottom: ${({ theme }) => theme.spacing.s1}px;
    }
    & ${MenuUl} {
      flex-direction: column;
      ${MenuLi} {
        padding: 0;
      }
    }
  }
`
const FooterCopy = styled.div`
  font-size: 0.85em;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.s2}px
    ${({ theme }) => theme.spacing.s1}px ${({ theme }) => theme.spacing.s1}px;
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
        <Content>{children}</Content>
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
