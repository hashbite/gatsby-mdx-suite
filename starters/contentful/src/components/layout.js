import React from 'react'

import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { Styled } from 'theme-ui'
import { useTranslation } from 'react-i18next'
import { Link } from 'gatsby'

import ColorModeSwitch from './color-mode-switch'

import LanguageSwitch from '@gatsby-mdx-suite/i18n/language-switch'
import MenuRecursive from '@gatsby-mdx-suite/menu/menu-recursive'
import MenuLevel from '@gatsby-mdx-suite/menu/menu-level'

const Main = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxContentWidth}px;
  padding: ${({ theme }) => theme.spacing.s1}px;
  margin: 0 auto;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.s2}px 0;
`

const Navigation = styled.nav``
const Content = styled.div``
const Footer = styled.footer``
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
      <Main>
        <Header>
          <h1>
            <Link to="/">Gatsby MDX Suite Starter</Link>
          </h1>
          <ColorModeSwitch />
          <LanguageSwitch />
        </Header>
        <Navigation>
          <MenuLevel rootMenuItemId="6Id378BoElgMsJJd81IyP3" />
          <MenuLevel rootMenuItemId="6Id378BoElgMsJJd81IyP3" level={2} />
        </Navigation>
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
