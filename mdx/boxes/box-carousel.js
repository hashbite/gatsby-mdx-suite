import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { CarouselProvider, Slider, DotGroup } from 'pure-react-carousel'

import 'pure-react-carousel/dist/react-carousel.es.css'

import BaseBox from './base-box'

const StyledDotGroup = styled(DotGroup)`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  button {
    background: black;
    border-radius: 1rem;
    width: 1rem;
    height: 1rem;
    display: inline-block;
    margin: 0 0.5rem;
    border: none;
    opacity: 0.4;

    &.carousel__dot--selected {
      opacity: 0.9;
    }
  }
`
/**
 * Creates a carousel within a Box. Must contain `<BoxCarouselSlide />` components.
 *
 * @example
 * <Boxes>
 * <BoxCarousel>
 * <BoxCarouselSlide colorSet="blue">
 *
 * # Slide #1
 *
 * </BoxCarouselSlide>
 * <BoxCarouselSlide colorSet="red">
 *
 * # Slide #2
 *
 * </BoxCarouselSlide>
 * <BoxCarouselSlide colorSet="green">
 *
 * # Slide #3
 *
 * </BoxCarouselSlide>
 * </BoxCarousel>
 * <Box colorSet="yellow" />
 * </Boxes>
 */
const BoxCarousel = ({
  children,
  controls,
  autoplay,
  autoplayInterval,
  loop,
  ...restProps
}) => {
  if (!children || !children.length) {
    return null
  }

  if (!Array.isArray(children)) {
    children = [children]
  }

  // Append carousel index to children
  children = children.map((child, index) =>
    React.cloneElement(child, { index })
  )

  return (
    <BaseBox {...restProps}>
      <CarouselProvider
        naturalSlideWidth={300}
        naturalSlideHeight={300}
        totalSlides={children.length}
        lockOnWindowScroll
        infinite={loop}
        isPlaying={autoplay}
        interval={autoplayInterval}
      >
        <Slider>{children}</Slider>
        {controls && <StyledDotGroup />}
      </CarouselProvider>
    </BaseBox>
  )
}

BoxCarousel.defaultProps = {
  ...BaseBox.defaultProps,
  controls: true,
  autoplay: true,
  autoplayInterval: 5000,
  loop: true,
}

BoxCarousel.propTypes = {
  ...BaseBox.propTypes,
  controls: propTypes.bool,
  autoplay: propTypes.bool,
  autoplayInterval: propTypes.bool,
  loop: propTypes.bool,
}

export default BoxCarousel
