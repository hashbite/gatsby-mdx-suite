import propTypes from 'prop-types'
import styled from '@emotion/styled'

const EmotionComponent = styled.a`
  color: ${({ color }) => color};
`

EmotionComponent.defaultProps = {
  color: 'red',
}

EmotionComponent.propTypes = {
  color: propTypes.string,
}

/**
 * @Component
 */
export default EmotionComponent
