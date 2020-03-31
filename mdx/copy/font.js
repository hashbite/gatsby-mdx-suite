import React from 'react'
import propTypes from 'prop-types'

import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'twin.macro'

import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

/**
 * Alter the font style of a partical part of a text or sentence.
 *
 * Should be used to layout within other paragraphs.
 *
 * To style a whole paragraph, please use the `<TextBlock/>` component.
 *
 * @example
 *
 * <Font family="heading" italic size="3" color="blue">
 * This will be display in the same font as headlines
 * </Font>
 *
 * Inline formattings <Font family="heading" italic color="red">are possible</Font> as well.
 */
const StyledFont = styled.span(
  ({
    color,
    family,
    size,
    weight,
    italic,
    lineHeight,
    transform,
    theme: { fonts, colors },
  }) =>
    css`
    ${
      size &&
      size !== Font.defaultProps.size &&
      css`
        ${size === 'xs' && tw`text-xs`}
        ${size === 'sm' && tw`text-sm`}
        ${size === 'base' && tw`text-base`}
        ${size === 'lg' && tw`text-lg`}
        ${size === 'xl' && tw`text-xl`}
        ${size === '2xl' && tw`text-2xl`}
        ${size === '3xl' && tw`text-3xl`}
        ${size === '4xl' && tw`text-4xl`}
        ${size === '5xl' && tw`text-5xl`}
        ${size === '6xl' && tw`text-6xl`}
      `
    }
    ${
      lineHeight &&
      lineHeight !== Font.defaultProps.lineHeight &&
      css`
        ${lineHeight === 'none' && tw`leading-none`}
        ${lineHeight === 'tight' && tw`leading-tight`}
        ${lineHeight === 'snug' && tw`leading-snug`}
        ${lineHeight === 'normal' && tw`leading-normal`}
        ${lineHeight === 'relaxed' && tw`leading-relaxed`}
        ${lineHeight === 'loose' && tw`leading-loose`}
      `
    }
    ${
      color &&
      color !== Font.defaultProps.color &&
      css`
        color: ${selectColor(colors, color)};
      `
    }
    ${
      family &&
      family !== Font.defaultProps.family &&
      css`
        font-family: ${fonts[family] || family};
      `
    }
    ${
      weight &&
      weight !== Font.defaultProps.weight &&
      css`
        font-weight: ${weight};
      `
    }
    ${
      italic &&
      css`
        font-style: italic;
      `
    }
    ${
      transform &&
      css`
        text-transform: ${transform};
      `
    }
  `
)

const Font = (props) => <StyledFont {...props} />

Font.propTypes = {
  children: propTypes.node.isRequired,
  /**
   * Set the font size.
   *
   * <Link to="/docs/theme/#font-sizes">List of all available font sizes</Link>
   **/
  size: propTypes.string,
  /**
   * Set the line height.
   *
   * <Link to="/docs/theme/#line-heights">List of all available font sizes</Link>
   **/
  lineHeight: propTypes.string,
  /**
   * Align the text content.
   *
   * <Link to="/docs/theme/#color">List of all available colors</Link>
   */
  color: propTypes.string,
  /**
   * Align the text content.
   *
   * <Link to="/docs/theme/#font-family">List of all available font families</Link>
   */
  family: propTypes.string,
  /**
   * Set the font weight. Most fonts may not be available in uncommon font weights.
   *
   * **Hint**:
   *
   * You should prefer markdown (`i am **bold**`: i am **bold**) to mark single words or sentence fragments as bold.
   *
   * <Link to="/docs/theme/#font-weights">List of all available font widghts</Link>
   **/
  weight: propTypes.string,
  /**
   * Applies italic font style.
   *
   * **Hint**:
   *
   * You should prefer markdown (`i am *italic*`: i am *italic*) to mark single words or sentence fragments as italic.
   **/
  italic: propTypes.bool,
  /**
   * Applies css text transforms. Usually used to render text as UPPERCASE or Capitalized for styling reasons.
   *
   * **Hint**:
   *
   * Never directly write content text in UPPERCASE, always use this functionallity as these words can show up in search results.
   **/
  transform: propTypes.string,
}

Font.defaultProps = {
  size: 'base',
  lineHeight: 'normal',
  color: 'text',
  family: 'body',
  weight: 'normal',
  italic: false,
}

export default Font
