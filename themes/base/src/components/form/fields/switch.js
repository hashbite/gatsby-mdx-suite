import React from 'react'
import tw from 'twin.macro'

import ErrorMessage from '../decoration/error-message'
import Label from '../decoration/label'

const SwitchInputLabel = tw(Label)`flex items-center cursor-pointer`
const SwitchInputWrapper = tw.div`relative`
const SwitchInputDescription = tw.div`ml-2`
const SwitchInputInput = tw.input`hidden`
const SwitchInputBackground = tw.div`w-10 h-4 bg-gray-400 rounded-full shadow-inner`
const SwitchInputToggle = tw.div`absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0`

const SwitchField = ({ children, checked, id, error, ...props }) => (
  <SwitchInputLabel htmlFor={id}>
    <SwitchInputWrapper>
      <SwitchInputInput
        id={id}
        type="checkbox"
        defaultChecked={checked}
        {...props}
      />
      <SwitchInputBackground
        style={{
          backgroundColor: checked && '#48bb78',
          transition: 'background-color 0.3s ease-out',
        }}
      />
      <SwitchInputToggle
        style={{
          top: '-.25rem',
          left: '-.25rem',
          transition: 'transform 0.3s ease-in-out',
          transform: checked && 'translateX(100%)',
        }}
      />
    </SwitchInputWrapper>
    <SwitchInputDescription>
      {children}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SwitchInputDescription>
  </SwitchInputLabel>
)

export default SwitchField
