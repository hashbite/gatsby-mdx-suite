import React from 'react'
import { t } from '@lingui/macro'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import tw from 'twin.macro'

import centerToContentColumn from '@gatsby-mdx-suite/helpers/styling/center-to-content-column'

import MenuRecursive from '../menu/menu-recursive'
import MenuUl from '../menu/menu-ul'

const FooterWrapper = styled.footer(
  (props) => css`
    ${tw`py-8`}
    ${centerToContentColumn(props)}
  `
)
const FooterMenu = styled.div`
  ${tw`py-8`}
  ${MenuUl} {
    ${tw`justify-center`}
  }
`
const FooterCopy = tw.div`text-sm text-center`

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterMenu>
        <MenuRecursive rootMenuItemId="menuRootFooter" />
      </FooterMenu>
      <FooterCopy>
        {t({
          id: 'copyright',
          message: `© {year}`,
          values: { year: new Date().getFullYear() },
        })}
      </FooterCopy>
    </FooterWrapper>
  )
}
