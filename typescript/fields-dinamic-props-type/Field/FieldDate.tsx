import React, { useMemo } from 'react'
import { noop } from 'lodash'

import { DateTimePicker, DateTimePickerProps } from '../../DatePicker'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<string> & Omit<DateTimePickerProps, 'name' | 'value' | 'onChange' | 'onSelect'>

export interface FieldDateProps extends Base {
  type: 'date'
}

const FieldDateNotMemo: React.FC<FieldDateProps> = ({
  value,
  onChange = noop,
  ...props
}) => {
  return (
    <DateTimePicker
      {...props}
      value={value}
      onSelect={(date) => onChange(date.toISOString())}
    />
  )
}

export const FieldDate: React.FC<FieldDateProps> = (props) => {
  return useMemo(() => (
    <FieldDateNotMemo {...props} />
  ), [props.value, props.disabled])
}
