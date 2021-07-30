import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import tw from 'twin.macro'

const DefaultLoadingWrapper = styled.div(
  () => css`
    ${tw`
      w-full flex flex-col items-center justify-center
      px-content-gap
      py-16
    `}
  `
)

const WaveAnimation = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.4);
  } 20% {
    transform: scaleY(1);
  }
`

const Label = styled.div`
  ${tw`mt-4`}
`
const WaveWrapper = styled.div`
  ${tw`w-20 h-8`}
  display: flex;
  justify-content: space-between;
`
const Wave = styled.div`
  ${tw`bg-primary`}
  height: 100%;
  width: 15%;
  animation: ${WaveAnimation} 1.2s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: -1.2s;
  }
  &:nth-child(2) {
    animation-delay: -1.1s;
  }
  &:nth-child(3) {
    animation-delay: -1s;
  }
  &:nth-child(4) {
    animation-delay: -0.9s;
  }
  &:nth-child(5) {
    animation-delay: -0.8s;
  }
`

const LoadingPlaceholder = ({ labelText = 'Loading...' }) => {
  return (
    <DefaultLoadingWrapper>
      <WaveWrapper>
        <Wave />
        <Wave />
        <Wave />
        <Wave />
        <Wave />
      </WaveWrapper>
      <Label>{labelText}</Label>
    </DefaultLoadingWrapper>
  )
}

LoadingPlaceholder.defaultProps = {}

LoadingPlaceholder.propTypes = {
  aspectRatio: propTypes.string,
}

export default LoadingPlaceholder
