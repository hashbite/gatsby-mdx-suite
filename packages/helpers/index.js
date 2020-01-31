import { css } from '@emotion/core'

import Cta from '@gatsby-mdx-suite/mdx-basic/cta'

export const applyColorSet = (props) => {
  const { theme, hasImage } = props
  let { backgroundColor, primaryColor, secondaryColor } = props

  const colorSetId =
    !props.colorSet && hasImage ? 'transparent' : props.colorSet

  const colorSet =
    colorSetId &&
    colorSetId in theme.colors.sets &&
    theme.colors.sets[colorSetId]

  if (colorSet) {
    backgroundColor = colorSet.background
    primaryColor = colorSet.primary
    secondaryColor = colorSet.secondary
  }

  return css`
    background: ${backgroundColor};
    color: ${secondaryColor};

    ${Cta} {
      color: ${primaryColor};
      border-color: ${primaryColor};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${primaryColor};
    }
  `
}

export const centerToContentColumn = ({
  theme: { sizes, breakpoints },
}) => css`
  margin: 0 auto;
  max-width: ${sizes.maxContentWidth + sizes.gridGutter * 2}px;

  /* Gradually increase horizontal content padding based on viewport width */
  padding: 0 2vw;
  @media (min-width: ${breakpoints[0]}) {
    padding: 0 4vw;
  }
  @media (min-width: ${breakpoints[1]}) {
    padding: 0 8vw;
  }
  @media (min-width: ${breakpoints[2]}) {
    padding: 0 15vw;
  }
`
