import React, { useContext } from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { useMDXDataState } from '@gatsby-mdx-suite/contexts/mdx-data'
import I18nContext from '@gatsby-mdx-suite/contexts/i18n'
import Image from '@gatsby-mdx-suite/mdx-basic/gatsby-image'

const BoxWrapper = styled.div`
  ${({ height }) =>
    height &&
    height > 1 &&
    css`
      grid-row-end: span ${height};
    `}
  ${({ width }) =>
    width &&
    width > 1 &&
    css`
      grid-column-end: span ${width};
    `}
  ${({ background, theme }) =>
    background &&
    css`
      background: ${theme.colors[background]};
    `}
  ${({ color, theme }) =>
    color &&
    css`
      color: ${theme.colors[color]};
    `}
`

const Box = ({ children, backgroundImage, ...props }) => {
  const { contentfulAssets } = useMDXDataState()
  const { active: activeLocale } = useContext(I18nContext)

  let imageContainer = null
  if (contentfulAssets && backgroundImage) {
    const asset = contentfulAssets.find(
      ({ contentful_id: cid, node_locale: locale }) =>
        cid === backgroundImage && locale === activeLocale
    )

    if (asset) {
      imageContainer = <Image {...asset} />
    }
  }
  return (
    <BoxWrapper {...props}>
      {children}
      {imageContainer}
    </BoxWrapper>
  )
}

Box.defaultProps = {
  children: null,
  backgroundImage: null,
}

Box.propTypes = {
  children: propTypes.node,
  backgroundImage: propTypes.string,
}

export default Box
