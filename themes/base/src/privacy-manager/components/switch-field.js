import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import tw from 'twin.macro'
import { Field } from 'react-final-form'

const SwitchInputWrapper = styled.div`
  ${tw`relative inline-block w-20 mr-2 align-middle select-none transition duration-200 ease-in`}
`

const SwitchInputFakeLabel = styled.label`
  ${tw`block overflow-hidden h-10 rounded-full bg-gray-300 cursor-pointer`}
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
      absolute block w-10 h-10
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

const SwitchField = ({ disabled, ...fieldProps }) => (
  <Field {...fieldProps} type="checkbox">
    {({ input }) => {
      const id = `checkbox-${input.name}`
      return (
        <SwitchInputWrapper>
          <SwitchInput
            type="checkbox"
            name={input.name}
            id={id}
            checked={input.checked}
            // eslint-disable-next-line react/jsx-handler-names
            onChange={input.onChange}
            disabled={disabled}
          />
          <SwitchInputFakeLabel htmlFor={id} className="toggle-label" />
        </SwitchInputWrapper>
      )
    }}
  </Field>
)

SwitchField.propTypes = {
  disabled: propTypes.bool,
}

export default SwitchField
