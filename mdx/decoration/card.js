import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import Image from '@gatsby-mdx-suite/mdx-image/image'

const CardWrapper = tw.div`rounded overflow-hidden shadow-lg`

const CardHeadline = tw.div`font-heading text-3xl`
const CardSubline = tw.div`uppercase font-bold text-lg`
const CardContent = tw.div`px-6 py-4`
const CardImage = tw(Image)`w-full`

export default function Card({ headline, subline, children, imageId }) {
  return (
    <CardWrapper>
      <CardImage id={imageId} />
      <CardContent>
        {headline && <CardHeadline>{headline}</CardHeadline>}
        {subline && <CardSubline>{subline}</CardSubline>}
        {children}
      </CardContent>
    </CardWrapper>
  )
}

Card.propTypes = {
  imageId: propTypes.string,
  headline: propTypes.string,
  subline: propTypes.string,
  children: propTypes.node,
}
