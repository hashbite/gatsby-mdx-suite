import React from 'react'
import propTypes from 'prop-types'

import { Styled } from 'theme-ui'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Font from './font'

/**
 * A TextBlock usually represents a text paragraph and should not be used inline.
 *
 * It can be rendered as other HTML elements like h1,h2,...
 *
 * Supports all features of the `<Font />` component.
 *
 * @example
 *
 * <TextBlock>
 * A normal paragraph
 * </TextBlock>
 * <TextBlock as="h1">
 * A complex headline<br/>
 * <Font color="blue" size="normal">With an embedded subline</Font>
 * </TextBlock>
 * <TextBlock family="heading" align="right">
 * Text blocks have alignment support.
 * </TextBlock>
 *
 * Inline formattings <TextBlock family="heading" italic color="red">are possible</TextBlock> as well.
 */
const StyledTextBlock = styled(Font)(
  ({ align }) => css`
    display: block;

    ${align &&
      align !== TextBlock.defaultProps.align &&
      css`
        text-align: ${align};
      `}
  `
)

const TextBlock = (props) => (
  <StyledTextBlock {...props} as={Styled[props.tag] || Styled.p} />
)

TextBlock.propTypes = {
  ...Font.propTypes,
  /**
   * Define the HTML element this text block is being rendered as.
   */
  tag: propTypes.string,
  /**
   * Set the alignment of the text conent.
   *
   * Available options: https://developer.mozilla.org/en/docs/Web/CSS/text-align
   **/
  align: propTypes.string,
}

TextBlock.defaultProps = {
  ...Font.defaultProps,
  tag: 'p',
  align: 'left',
}

export default TextBlock
