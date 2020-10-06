import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Icon from '@gatsby-mdx-suite/mdx-copy/icon'

const ModalContentWrapper = styled.div`
  ${tw`
    relative
    m-auto max-w-content-column p-8
    bg-root-background shadow rounded
    cursor-auto
  `}
  pointer-events: all;
`
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
