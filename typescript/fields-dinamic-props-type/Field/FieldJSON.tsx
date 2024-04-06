import React, { useMemo } from 'react'
import { noop } from 'lodash'

import { Input, InputProps } from '../../Input'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<string> & Omit<InputProps, 'type' | 'name' | 'value' | 'onChange'>

export interface FieldJSONProps extends Base {
  type: 'json'
}

const FieldJSONNotMemo = ({
  value = '',
  onChange = noop,
  ...props
}: FieldJSONProps) => {
  return (
    <Input
      {...props}
      value={JSON.stringify(value)}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export const FieldJSON: React.FC<FieldJSONProps> = (props) => {
  return useMemo(() => (
    <FieldJSONNotMemo {...props} />
  ), [props.value, props.disabled])
}
