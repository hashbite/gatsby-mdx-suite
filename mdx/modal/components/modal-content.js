import React from 'react'
import propTypes from 'prop-types'
import tw from 'twin.macro'

import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

const ModalContentWrapper = tw.div`relative`
const ModalCloseButton = tw.a`
  absolute top-0 right-0
  mt-2 mr-2 p-4
  cursor-pointer
`

const ModalContent = ({ children, closeModal }) => {
  return (
    <ModalContentWrapper>
      {children}
      <ModalCloseButton onClick={closeModal}>
        <Icon icon="close" />
      </ModalCloseButton>
    </ModalContentWrapper>
  )
}

ModalContent.propTypes = {
  children: propTypes.node.isRequired,
  closeModal: propTypes.func.isRequired,
}

export default ModalContent
