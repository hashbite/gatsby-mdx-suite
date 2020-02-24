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
  ${tw`flex-auto`}
`

const Footer = styled.footer`
  ${centerToContentColumn}
`
const FooterMenu = styled.nav`
  ${tw`pt-16 justify-between`}

  & > ${MenuUl} {
    & > li > ${MenuTitle} {
      ${tw`pb-4 font-bold text-gray-600`}
    }
    & ${MenuUl} {
      ${tw`flex-col`}
      flex-direction: column;
      ${MenuLi} {
        ${tw`p-0`}
      }
    }
  }
`
const FooterCopy = tw.div`text-sm text-center pt-8 px-4 pb-4`

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
