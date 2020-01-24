import React, {useContext} from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import MdxDataContext from '@gatsby-mdx-suite/contexts/mdx-data'
import Image from '@gatsby-mdx-suite/mdx-basic/gatsby-image'

// Shortcuts to ease up editor UX: start, end -> flex-start, flex-end; center -> center
const extendPositionArgument = (value) =>
  value === 'center' ? value : `flex-${value}`

const ViewportWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontalAlign }) =>
    extendPositionArgument(horizontalAlign)};
  justify-content: ${({ verticalAlign }) =>
    extendPositionArgument(verticalAlign)};

  ${({ hasImage }) =>
    hasImage &&
    css`
      color: #fff;
    `}
`

const ViewportContent = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  max-width: 900px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.s12}px
    ${({ theme }) => theme.spacing.s2}px;
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontalAlign }) =>
    extendPositionArgument(horizontalAlign)};
`

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & .gatsby-image-wrapper {
    position: absolute !important;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default function Viewport({
  children,
  image,
  horizontalAlign = 'center',
  verticalAlign = 'center',
}) {
  let backgroundImage = null
  if (image) {
    const mdxData = useContext(MdxDataContext)
    const imageData = mdxData[image]
    if (imageData) {
      backgroundImage = <Image {...imageData} objectFit="cover" />
    }
  }

  return (
    <ViewportWrapper
      hasImage={!!image}
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
    >
      {children && (
        <ViewportContent horizontalAlign={horizontalAlign}>
          {children}
        </ViewportContent>
      )}
      {backgroundImage && (
        <BackgroundImageWrapper>{backgroundImage}</BackgroundImageWrapper>
      )}
    </ViewportWrapper>
  )
}

Viewport.propTypes = {
  children: propTypes.node,
  /** image id to display as background image */
  image: propTypes.string,
  /** horizontal content alignment */
  horizontalAlign: propTypes.string,
  /** vertical content alignment */
  verticalAlign: propTypes.string,
}
