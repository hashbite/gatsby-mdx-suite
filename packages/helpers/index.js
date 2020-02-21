import { css } from '@emotion/core'
import tw from 'twin.macro'

import { StyledCTA } from '@gatsby-mdx-suite/mdx-link/cta'

export const applyColorSet = ({
  theme,
  colorSet,
  backgroundColor,
  primaryColor,
  secondaryColor,
}) => {
  const colorSetData =
    colorSet && colorSet in theme.colors.sets && theme.colors.sets[colorSet]

  if (colorSetData) {
    backgroundColor = colorSetData.background
    primaryColor = colorSetData.primary
    secondaryColor = colorSetData.secondary
  }

  return css`
    ${backgroundColor &&
      css`
        background: ${backgroundColor};
      `}
    ${secondaryColor &&
      css`
        color: ${secondaryColor};
      `}
    ${primaryColor &&
      css`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: ${primaryColor};
        }
      `}

      ${StyledCTA} {
        color: ${primaryColor};
        border-color: ${primaryColor};
      }
  `
}

export const centerToContentColumn = ({
  theme: {
    config: { contentColumnMaxWidth },
  },
}) => css`
  ${tw`box-content mx-auto w-full px-8`}
  max-width: ${contentColumnMaxWidth};
`
