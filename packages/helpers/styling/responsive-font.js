import { css } from '@emotion/react'

const responsiveFont = ({
  theme,
  fontSizeMin = '1.5rem',
  fontSizeMax = '4rem',
  lineHeightMin = '1.1',
  lineHeightMax = '1.3',
}) => {
  const scaleStart = '300px'
  const scaleEnd = theme.spacing['content-column']
  const scaleRange = parseInt(scaleEnd) - parseInt(scaleStart)

  let diff = parseFloat(fontSizeMax) - parseFloat(fontSizeMin)

  if (fontSizeMin.indexOf('rem') !== -1) {
    fontSizeMin = `${parseFloat(fontSizeMin) * 16}px`
    fontSizeMax = `${parseFloat(fontSizeMax) * 16}px`
    diff = diff * 16
  }

  return css`
    font-size: ${fontSizeMin};
    line-height: ${lineHeightMin};

    @media screen and (min-width: ${scaleStart}) {
      --scale-factor: calc(100vw - ${scaleStart}) / ${scaleRange};
      font-size: calc(${fontSizeMin} + ${diff} * var(--scale-factor));
      line-height: calc(
        ${lineHeightMin} +
          (${parseFloat(lineHeightMax) - parseFloat(lineHeightMin)}) *
          var(--scale-factor)
      );
    }
    @media screen and (min-width: ${scaleEnd}) {
      font-size: ${fontSizeMax};
      line-height: ${lineHeightMax};
    }
  `
}

export default responsiveFont
