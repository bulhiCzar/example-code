import React, { useMemo } from 'react'
import { noop } from 'lodash'

import { Input, InputProps } from '../../Input'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<string> & Omit<InputProps, 'type' | 'name' | 'value' | 'onChange'>

export interface FieldStringProps extends Base {
  type: 'string'
}

const FieldStringNotMemo = ({
  value = '',
  onChange = noop,
  ...props
}: FieldStringProps) => {
  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export const FieldString: React.FC<FieldStringProps> = (props) => {
  return useMemo(() => (
    <FieldStringNotMemo {...props} />
  ), [props.value, props.disabled])
}
