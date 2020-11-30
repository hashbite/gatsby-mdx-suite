import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import tw from 'twin.macro'

const SwitchInputWrapper = styled.div`
  ${tw`relative inline-block w-16 mr-2 align-middle select-none transition duration-200 ease-in`}
`

const SwitchInputFakeLabel = styled.label`
  ${tw`block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer`}
  transition: background 0.15s;
`

const slideAnimation = keyframes`
  from { left: 0; }
  to {
    left: 100%;
    transform: translateX(-100%);
  }
`

const SwitchInput = styled.input(
  ({ theme }) => css`
    ${tw`
      absolute block w-8 h-8
      rounded-full bg-white
      border-4 border-gray-300
      appearance-none cursor-pointer
      `}

    &:focus, &:hover {
      ${tw`outline-none border-green-400`}
    }

    &:checked {
      animation: ${slideAnimation} 0.15s both;

      & + ${SwitchInputFakeLabel} {
        ${tw`bg-green-400`}
      }
    }

    &:disabled {
      ${tw`cursor-not-allowed`}

      & + ${SwitchInputFakeLabel} {
        ${tw`bg-gray-400 cursor-not-allowed`}
      }
    }
  `
)

const SwitchLabel = styled.label`
  ${tw`cursor-pointer`}
`

const SwitchField = ({ children, ...props }) => (
  <>
    <SwitchInputWrapper>
      <SwitchInput type="checkbox" {...props} />
      <SwitchInputFakeLabel htmlFor={props.id} />
    </SwitchInputWrapper>
    {children && <SwitchLabel htmlFor={props.id}>{children}</SwitchLabel>}
  </>
)

export default SwitchField
