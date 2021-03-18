import React from 'react'
import { Field } from 'react-final-form'

import Switch from '../fields/switch'

const SwitchField = ({ disabled, children, ...fieldProps }) => (
  <Field {...fieldProps} type="checkbox">
    {({ input, meta }) => (
      <Switch
        id={`checkbox-${input.name}`}
        {...input}
        checked={!!input.value}
        error={
          (meta.error || meta.submitError) &&
          meta.touched &&
          (meta.error || meta.submitError)
        }
      >
        {children}
      </Switch>
    )}
  </Field>
)

export default SwitchField
