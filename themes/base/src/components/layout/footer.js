import React from 'react'
import tw from 'twin.macro'

import MenuRecursive from '../menu/menu-recursive'

import { useTranslation } from 'react-i18next'

const FooterWrapper = tw.footer`py-8`

export default function Footer() {
  const { t } = useTranslation()

  return (
    <FooterWrapper>
      <FooterMenu>
        <MenuRecursive rootMenuItemId="menuRootFooter" />
      </FooterMenu>
      <FooterCopy>
        {t('copyright', { year: new Date().getFullYear() })}
      </FooterCopy>
    </FooterWrapper>
  )
}
