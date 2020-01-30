import React from 'react'
import propTypes from 'prop-types'
import Img from 'gatsby-image'

// Render inline SVG with fallback non-svg images
export default function Image({ svg, fluid, file, src, alt, width, height }) {
  const imgProps = {}
  if (alt && alt.trim && alt.trim()) {
    imgProps.alt = alt.trim()
  } else {
    imgProps.role = 'presentation'
  }

  const dimensionProps = {}
  if (width) {
    dimensionProps.width = width
  }
  if (height) {
    dimensionProps.height = height
  }

  if (src) {
    return <img {...imgProps} {...dimensionProps} src={src} />
  }

  if (file.contentType === 'image/svg+xml') {
    if (svg) {
      // Inlined SVGs
      return (
        <div
          {...dimensionProps}
          dangerouslySetInnerHTML={{ __html: svg.content }}
        />
      )
    }

    // SVGs that can/should not be inlined
    return <img {...imgProps} {...dimensionProps} src={file.url} />
  }

  // Non SVG images
  return <Img {...imgProps} {...dimensionProps} fluid={fluid} />
}

Image.propTypes = {
  svg: propTypes.object,
  fluid: propTypes.object,
  file: propTypes.object,
  src: propTypes.string,
  alt: propTypes.string,
  width: propTypes.string,
  height: propTypes.string,
}
