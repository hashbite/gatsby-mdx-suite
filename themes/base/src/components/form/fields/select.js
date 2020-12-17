import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import { textFieldStyle, focusStyle } from './styles'

const SelectWrapper = styled.div`
  ${tw`relative text-gray-900`}
`

const SelectElement = styled.select`
  ${textFieldStyle}

  ${tw`relative z-0 pr-10 cursor-pointer text-current`}

  ${focusStyle}
`

const SelectLabel = styled.label`
  ${tw`absolute z-10`}
  right: 0.75em;
  top: 50%;
  transform: translateY(-50%);
  width: 1em;
  pointer-events: none;
`

const Select = ({ defaultValue, onChange, className, children, ...props }) => {
  const [value, setValue] = useState(defaultValue)

  // Attach .placeholder class if default value is selected
  const wrappedOnChange = useCallback(
    (e) => {
      setValue(e.target.value)
      onChange(e)
    },
    [onChange]
  )

  return (
    <SelectWrapper className={className}>
      <SelectElement
        {...props}
        defaultValue={defaultValue}
        className={!value && `placeholder`}
        onChange={wrappedOnChange}
      >
        {children}
      </SelectElement>
      <SelectLabel htmlFor={props.id}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </SelectLabel>
    </SelectWrapper>
  )
}

export default Select
