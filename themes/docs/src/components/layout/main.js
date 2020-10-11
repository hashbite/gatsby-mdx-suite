import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import ColorSet from '@gatsby-mdx-suite/mdx-color-set/color-set'

const MainWrapper = styled.div(
  ({ theme }) => css`
    ${tw`overflow-x-scroll prose`}

    grid-area: main;
  `
)

const Main = ({ children }) => (
  <ColorSet background="white" text="gray-900">
    <MainWrapper>{children}</MainWrapper>
  </ColorSet>
)

Main.propTypes = {
  children: propTypes.node.isRequired,
}

export default Main
