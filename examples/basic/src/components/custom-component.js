import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

const CustomComponentWrapper = tw.div`bg-red-600 h-12`

const CustomComponent = ({ children }) => {
  return <CustomComponentWrapper>{children}</CustomComponentWrapper>
}

CustomComponent.propTypes = {
  children: propTypes.node,
}

export default CustomComponent
