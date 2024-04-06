import React, { useMemo } from 'react'
import { noop } from 'lodash'

import { Select, SelectProps } from '../../Select'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<string> & Omit<SelectProps<string | number>, 'type' | 'name'>

export interface FieldSelectProps extends Base {
  type: 'select'
}

const FieldSelectNotMemo: React.FC<FieldSelectProps> = ({
  value,
  onChange = noop,
  ...props
}) => {
  return (
    <Select
      {...props}
      value={value}
      onSelect={(key) => onChange(key)}
    />
  )
}

export const FieldSelect: React.FC<FieldSelectProps> = (props) => {
  return useMemo(() => (
    <FieldSelectNotMemo {...props} />
  ), [props.value, props.options, props.disabled, props.multiple])
}
