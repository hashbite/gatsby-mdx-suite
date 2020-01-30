import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'

import Image from './Image'

const CardWrapper = styled.div`
  position: relative;
  background: #f6f6f6;
  padding: ${({ theme }) => theme.spacing.s1}px;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: ${({ theme }) => theme.spacing.s3}px;
  }

  &:before {
    content: '';
    position: absolute;
    display: block;
    left: ${({ theme }) => theme.spacing.s1}px;
    height: ${({ theme }) => theme.spacing['s0.5']}px;
    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      left: ${({ theme }) => theme.spacing.s3}px;
      height: ${({ theme }) => theme.spacing.s2}px;
    }
    top: 0;
    width: 3px;
    background: #2c94e2;
  }
`
const CardHeadline = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 45px;
  line-height: 1.05em;
  font-weight: 300;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 70px;
  }
`
const CardSubline = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: 20px;
  }
`
const CardDescription = styled.p`
  font-style: italic;
  opacity: 0.75;
`
const CardLogo = styled(Image)``

export default function Card({ headline, subline, description, logoId }) {
  return (
    <CardWrapper>
      <CardHeadline>{headline}</CardHeadline>
      <CardSubline>{subline}</CardSubline>
      <CardDescription>{description}</CardDescription>
      <CardLogo id={logoId} />
    </CardWrapper>
  )
}

Card.propTypes = {
  headline: propTypes.string,
  subline: propTypes.string,
  description: propTypes.string,
  logoId: propTypes.string
}
