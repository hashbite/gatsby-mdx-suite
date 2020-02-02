import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import MenuLevel from '@gatsby-mdx-suite/menu/menu-level'
import LanguageSwitch from '@gatsby-mdx-suite/i18n/language-switch'
import { centerToContentColumn } from '@gatsby-mdx-suite/helpers'
import Image from '@gatsby-mdx-suite/mdx-basic/image'

import ColorModeSwitch from '../color-mode-switch'

const HeaderContent = styled.div`
  ${centerToContentColumn}
`

const Header = ({ children, backgroundImageId }) => {
  return (
    <header>
      <MenuLevel rootMenuItemId="6Id378BoElgMsJJd81IyP3" />
      <LanguageSwitch />
      <ColorModeSwitch />
      <HeaderContent>{children}</HeaderContent>
      {backgroundImageId && (
        <Image id={backgroundImageId} contextKey="background" />
      )}
    </header>
  )
}

Header.propTypes = {
  children: propTypes.node,
  backgroundImageId: propTypes.string,
}

export default Header
