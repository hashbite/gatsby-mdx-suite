import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

const CustomComponentWrapper = tw.div`bg-red-600 h-12`

/**
 * Description for your custom component
 *
 * @example
 * <CustomComponent>
 *
 * # Example headline
 *
 * </CustomComponent>
 */
const CustomComponent = ({ children }) => {
  return (
    <CustomComponentWrapper data-cypress="custom-component">
      {children}
    </CustomComponentWrapper>
  )
}

CustomComponent.defaultProps = {
  doSomething: 'nah',
}

CustomComponent.propTypes = {
  children: propTypes.node,
  /** Description for your property */
  doSomething: propTypes.string,
}

export default CustomComponent
