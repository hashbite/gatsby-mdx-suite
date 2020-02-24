import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledGap = styled.div(
  ({ theme, gap }) => css`
    height: ${theme.sizes[gap]};
  `
)

/**
 * Creates a vertical gap between content.
 * @example
 * <Image id="randomPictureId" width="120" />
 * <Gap />
 * <Image id="randomPictureId" width="120" />
 * <Gap gap="64"/>
 * <Image id="randomPictureId" width="120" />
 */
const Gap = (props) => <StyledGap {...props} />

Gap.defaultProps = {
  gap: 16,
}

Gap.propTypes = {
  gap: propTypes.number,
}

export default Gap
