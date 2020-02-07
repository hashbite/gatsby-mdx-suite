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

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  ${({ theme }) => console.log({ theme })}
`

const Content = styled.div`
  width: 100%;
`

const Footer = styled.footer`
  ${centerToContentColumn}
  width: 100%;
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
  ${`text-sm text-center px-1 pt-2`}
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
