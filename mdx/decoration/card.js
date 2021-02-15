import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import Image from 'gatsby-theme-mdx-suite-core/src/components/image'

const CardWrapper = tw.div`rounded overflow-hidden shadow-lg bg-white`

const CardHeadline = tw.div`font-heading text-3xl`
const CardSubline = tw.div`uppercase font-bold text-lg`
const CardContent = tw.div`px-6 py-4`
const CardImage = tw(Image)`w-full`

/**
 * Creates a common Card element. Should be within a `<Grid/>`, <Columns />` or similar.
 *
 * @example
 * <Columns>
 * <Card headline="My Headline" subline="Some additional subline" imageId="randomPictureId">
 *
 * I am the actual description for the card.
 *
 * Common **formatting** is supported.
 *
 * </Card>
 * <Card headline="My Headline" subline="Some additional subline" imageId="randomPictureId">
 *
 * I am the actual description for the card.
 *
 * Common **formatting** is supported.
 *
 * </Card>
 * <Card headline="My Headline" subline="Some additional subline" imageId="randomPictureId">
 *
 * I am the actual description for the card.
 *
 * Common **formatting** is supported.
 *
 * </Card>
 * </Columns>
 */
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
