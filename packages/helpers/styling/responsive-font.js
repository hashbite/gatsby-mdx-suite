import { css } from '@emotion/core'

const responsiveFont = ({
  theme: {
    sizes: { maxContentWidth },
    colors,
  },
  fontSizeMin = '24px',
  fontSizeMax = '64px',
  lineHeightMin = '1.4em',
  lineHeightMax = '1.1em',
}) => css`
  font-size: ${fontSizeMin};
  line-height: ${lineHeightMin};

  @media screen and (min-width: 300px) {
    font-size: calc(
      ${fontSizeMin} + (${parseFloat(fontSizeMax) - parseFloat(fontSizeMin)}) *
        ((100vw - 300px) / ${maxContentWidth - 300})
    );
    line-height: calc(
      ${lineHeightMin} +
        (${parseFloat(lineHeightMax) - parseFloat(lineHeightMin)}) *
        ((100vw - 300px) / ${maxContentWidth - 300})
    );
  }
  @media screen and (min-width: ${maxContentWidth}px) {
    font-size: ${fontSizeMax};
    line-height: ${lineHeightMax};
  }

  @media screen and (min-width: ${maxContentWidth}px) {
    font-size: ${fontSizeMax};
    line-height: ${lineHeightMax};
  }
`

export default responsiveFont
