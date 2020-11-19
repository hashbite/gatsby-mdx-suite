import React from 'react'
import { Field } from 'react-final-form'

import Switch from '../fields/switch'

const SwitchField = ({ disabled, ...fieldProps }) => (
  <Field {...fieldProps} type="checkbox">
    {({ input }) => <Switch id={`checkbox-${input.name}`} {...input} />}
  </Field>
)

export default SwitchField
