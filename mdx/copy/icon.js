import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

const IconWrapper = styled.span(
  ({ verticalAlign, scale, color, theme }) =>
    css`
      display: inline-block;
      transform-origin: 50% 50%;

      ${verticalAlign !== 'baseline' &&
      css`
        vertical-align: ${verticalAlign};
      `}

      ${color &&
      css`
        color: ${selectColor(theme.colors, color)};
      `}

      ${scale &&
      css`
        transform: scale(${scale});
      `}

      svg {
        display: inline-block;
        width: 1em;
        height: auto;
        vertical-align: baseline;
      }
    `
)

/**
 * Renders an icon from entypo. Only a subset of all entypo icons are available due to performance reasons.
 *
 * @example
 * <Icon icon="star" />
 * <Icon icon="instagram" />
 * <Icon icon="facebook" color="#4267B2" />
 * <Icon icon="youtube" color="red" />
 */
const Icon = ({ icon, color, svgProps, ...props }) => {
  const icons = useContext(IconsContext)
  const IconData = icons.get(icon)
  if (!IconData) {
    throw new Error(`Unable to locate icon "${icon}"`)
  }
  const ActualIcon = IconData.icon
  return (
    <IconWrapper scale={IconData.scale} color={color} {...props}>
      <ActualIcon {...svgProps} />
    </IconWrapper>
  )
}

Icon.defaultProps = {
  verticalAlign: 'baseline',
}

Icon.propTypes = {
  /** Name of the icon to render. The available icons can be found in the <Link to="/docs/theme#icons">theme documentation for icons</Link> */
  icon: propTypes.string.isRequired,
  /** Color of the icon. Will use current text color by default.*/
  color: propTypes.string,
  /** Adjust the vertical align of the icon. Useful values: top, bottom, middle, baseline, text-top, text-bottom */
  verticalAlign: propTypes.string,
  svgProps: propTypes.object,
}

export default Icon
