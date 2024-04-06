import React, { useEffect, useMemo, useState } from 'react'
import { noop } from 'lodash'

import { Input, InputProps } from '../../Input'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<number> & Omit<InputProps, 'type' | 'name' | 'value' | 'onChange'>

export interface FieldNumberProps extends Base {
  type: 'number'
}

const isNumber = (str: string) => str.split('\n').filter(Boolean).reduce((acc, v) => acc && /^[-]?(\d+(\.\d+)?)$/m.test(v), true)

export const FieldNumberNotMemo: React.FC<FieldNumberProps> = ({
  value = '',
  onChange = noop,
  ...props
}) => {
  const [input, setInput] = useState(value)

  const handlerInput = (value: string) => {
    const data = value
      .replace(/[^0-9.-]/g, '')
      .replace(/(\..*?)\..*/g, '$1')

    setInput(data)
    const result = data === '' || data === null
      ? null
      : Number(data)

    if (isNumber(String(data))) {
      onChange(result)
    } else {
      setTimeout(() => onChange(result), 1500)
    }
  }

  useEffect(() => {
    setInput(value)
  }, [String(value)])

  return (
    <Input
      {...props}
      value={input}
      type="string"
      onChange={(e) => handlerInput(e.target.value)}
    />
  )
}

export const FieldNumber: React.FC<FieldNumberProps> = (props) => {
  return useMemo(() => (
    <FieldNumberNotMemo {...props} />
  ), [props.value, props.disabled])
}
