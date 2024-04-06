import { noop } from 'lodash'
import React, { useMemo } from 'react'
import { InputArray, InputArrayProps } from '../../Input'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<string[] | number[]> & Omit<InputArrayProps<unknown>, 'type' | 'name' | 'value' | 'onChange'>

export interface FieldArrayProps extends Base {
  type: 'array'
}

const FieldArrayNotMemo: React.FC<FieldArrayProps> = ({
  value,
  onChange = noop,
  ...props
}) => {
  return (
    <InputArray
      {...props}
      value={value}
      onArray={(arr) => onChange(arr)}
    />
  )
}

export const FieldArray: React.FC<FieldArrayProps> = (props) => {
  return useMemo(() => (
    <FieldArrayNotMemo {...props} />
  ), [props.value, props.options, props.disabled])
}
