import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

const DefaultLoadingWrapper = styled.div(
  ({ aspectRatio }) => css`
    ${tw`
      w-full flex items-center justify-center
      p-content-gap
      border border-solid border-4 border-gray-800
      bg-gray-700 text-white text-2xl
    `}

    &::before {
      content: '';
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: calc(100% / (${aspectRatio}));
    }
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  `
)

const LoadingPlaceholder = ({ aspectRatio }) => {
  return (
    <DefaultLoadingWrapper aspectRatio={aspectRatio}>
      Loading...
    </DefaultLoadingWrapper>
  )
}

LoadingPlaceholder.defaultProps = {
  aspectRatio: '16 / 9',
}

LoadingPlaceholder.propTypes = {
  aspectRatio: propTypes.string,
}

export default LoadingPlaceholder
