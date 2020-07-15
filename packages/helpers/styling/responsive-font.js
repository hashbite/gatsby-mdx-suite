import { css } from '@emotion/core'

const responsiveFont = ({
  theme,
  fontSizeMin = '24px',
  fontSizeMax = '64px',
  lineHeightMin = '1.4em',
  lineHeightMax = '1.1em',
}) => {
  const scaleStart = '300px'
  const scaleEnd = theme.sizes.contentColumn
  const scaleRange = parseInt(scaleEnd) - parseInt(scaleStart)

  return css`
    font-size: ${fontSizeMin};
    line-height: ${lineHeightMin};

    @media screen and (min-width: ${scaleStart}) {
      font-size: calc(
        ${fontSizeMin} + (${parseFloat(fontSizeMax) - parseFloat(fontSizeMin)}) *
          ((100vw - ${scaleStart}) / ${scaleRange})
      );
      line-height: calc(
        ${lineHeightMin} +
          (${parseFloat(lineHeightMax) - parseFloat(lineHeightMin)}) *
          ((100vw - ${scaleStart}) / ${scaleRange})
      );
    }
    @media screen and (min-width: ${scaleEnd}) {
      font-size: ${fontSizeMax};
      line-height: ${lineHeightMax};
    }
  `
}

export default responsiveFont
