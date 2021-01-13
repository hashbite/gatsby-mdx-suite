import React from 'react'
import { Field } from 'react-final-form'

import Input from '../fields/input'

const InputField = (fieldProps) => (
  <Field {...fieldProps}>
    {({ input, meta, ...rest }) => (
      <Input
        {...input}
        {...rest}
        error={
          (meta.error || meta.submitError) &&
          meta.touched &&
          (meta.error || meta.submitError)
        }
      />
    )}
  </Field>
)

export default InputField
