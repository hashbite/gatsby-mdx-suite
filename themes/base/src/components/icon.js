import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import IconsContext from '@gatsby-mdx-suite/contexts/icons'
import selectColor from '@gatsby-mdx-suite/helpers/styling/select-color'

const IconWrapper = styled.span(
  ({ display, verticalAlign, scale, color, theme }) =>
    css`
      display: ${display};

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
        transform-origin: 50% 50%;
        transform: scale(${scale});
      `}

      svg {
        display: ${display};
        width: 1em;
        height: auto;
        vertical-align: baseline;
      }
    `
)

/**
 * Renders an icon. Icons are registered via IconsContext in your gatsby-browser.js
 *
 * @example
 * <Icon icon="star" />
 * <Icon icon="instagram" />
 * <Icon icon="facebook" color="#4267B2" />
 * <Icon icon="youtube" color="red" />
 */
const Icon = ({ icon, svgProps, ...props }) => {
  const icons = useContext(IconsContext)
  const IconData = icons.get(icon)
  if (!IconData) {
    throw new Error(`Unable to locate icon "${icon}"`)
  }
  const ActualIcon = IconData.icon
  return (
    <IconWrapper scale={IconData.scale} {...props}>
      <ActualIcon {...svgProps} />
    </IconWrapper>
  )
}

Icon.defaultProps = {
  verticalAlign: 'middle',
  display: 'inline-block',
}

Icon.propTypes = {
  /** Name of the icon to render. The available icons can be found in the <Link to="/docs/style-guide/#icons">theme documentation for icons</Link> */
  icon: propTypes.string.isRequired,
  /** Color of the icon. Will use current text color by default.*/
  color: propTypes.string,
  /** Adjust the vertical align of the icon. Useful values: top, bottom, middle, baseline, text-top, text-bottom */
  verticalAlign: propTypes.string,
  svgProps: propTypes.object,
  display: propTypes.oneOf(['block', 'inline-block']),
}

export default Icon
