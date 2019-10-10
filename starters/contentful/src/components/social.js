import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import bandcamp from 'simple-icons/icons/bandcamp'
import instagram from 'simple-icons/icons/instagram'

const icons = {
  bandcamp,
  instagram,
}

const IconLink = styled.a`
  flex: 0 0 auto;
  display: block;
  width: 30px;
  margin: ${({ theme }) => theme.spacing['s0.5']}px;
  transform: scale(${({ scale = 1 }) => scale});

  path {
    fill: ${({ theme }) => theme.colors.text};
    opacity: 0.4;
    transition: 0.3s any linear;
  }

  :hover path {
    fill: ${(props) => props.hover};
    opacity: 1;
  }
`

const LinkedIcon = function({ href, icon, scale }) {
  const { svg, hex } = icons[icon]
  return (
    <IconLink
      href={href}
      hover={`#${hex}`}
      scale={scale}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

LinkedIcon.propTypes = {
  href: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  scale: propTypes.number,
}

export default function social() {
  return (
    <>
      <LinkedIcon
        icon="instagram"
        aria-label="Find me on Instagram"
        href="https://www.instagram.com/vanashafis/"
        scale={0.7}
      />
      <LinkedIcon
        icon="bandcamp"
        aria-label="Find me on bandcamp"
        href="https://vanashafis.bandcamp.com/"
      />
    </>
  )
}
