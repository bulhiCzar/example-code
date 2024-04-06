import React, { useMemo } from 'react'
import { noop } from 'lodash'

import { FieldBase } from '../FieldsMap'
import { Select, SelectProps } from '../../Select'

type Base = FieldBase<boolean> & Omit<SelectProps<boolean>, 'type' | 'name' | 'onChange' | 'value' | 'options'>

export interface FieldSwitchProps extends Base {
  type: 'switch'
}

const options = [
  { value: 'Да', key: true },
  { value: 'Нет', key: false },
]

const FieldSwitchNotMemo: React.FC<FieldSwitchProps> = ({
  value,
  onChange = noop,
  ...props
}) => {
  return (
    <Select
      {...props}
      value={value}
      options={options}
      onSelect={(key) => onChange(key)}
    />
  )
}

export const FieldSwitch: React.FC<FieldSwitchProps> = (props) => {
  return useMemo(() => (
    <FieldSwitchNotMemo {...props} />
  ), [props.value, props.disabled])
}
