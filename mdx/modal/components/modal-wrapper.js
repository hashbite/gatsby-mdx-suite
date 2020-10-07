import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactModal from 'react-modal'
import tw from 'twin.macro'

ReactModal.setAppElement('#___gatsby')

const StyledModal = styled(ReactModal)`
  ${tw`w-full h-full flex p-4 overflow-y-auto`}
  background: rgba(0,0,0,0.42);

  > div {
    ${tw`
      m-auto max-w-content-column p-8
      bg-rootBackground shadow rounded `}
  }
`

const ModalWrapper = ({ children, ...props }) => {
  return (
    <StyledModal
      {...props}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      {children}
    </StyledModal>
  )
}

ModalWrapper.propTypes = {
  children: propTypes.node.isRequired,
}

export default ModalWrapper
