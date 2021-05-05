import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const StyledGap = styled.div(
  ({ theme, gap }) => css`
    height: ${theme.spacing[gap]};
  `
)

/**
 * Creates a vertical gap between content.
 *
 * @example
 * <Columns>
 * <Column>
 *
 * **Default gap:**
 *
 * <Image id="randomPictureId" width="120" />
 * <Gap />
 * <Image id="randomPictureId" width="120" />
 *
 * </Column>
 * <Column>
 *
 * **Gap with size of 32:**
 *
 * <Image id="randomPictureId" width="120" />
 * <Gap gap="32"/>
 * <Image id="randomPictureId" width="120" />
 *
 * </Column>
 * </Columns>
 */
const Gap = (props) => <StyledGap {...props} />

Gap.defaultProps = {
  gap: 16,
}

Gap.propTypes = {
  /** Actual gap to be applied. See <Link to="/docs/theme#sizes">theme documentation for available sizes</Link> */
  gap: propTypes.oneOfType([propTypes.number, propTypes.string]),
}

export default Gap
