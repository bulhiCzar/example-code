import { InputFile, InputFileProps } from '../../Input'
import React, { useMemo } from 'react'
import { FieldBase } from '../FieldsMap'
import { noop } from 'lodash'

type Base<T> = FieldBase<T> & Omit<InputFileProps<T>, 'name' | 'value' | 'onChange'>

export interface FieldFileProps extends Base<string | string[]> {
  type: 'file'
}
const FieldFileNotMemo: React.FC<FieldFileProps> = ({
  value,
  onChange = noop,
  ...props
}) => {
  return (
    <InputFile
      {...props}
      value={value}
      onFile={(file) => onChange(file)}
    />
  )
}

export const FieldFile: React.FC<FieldFileProps> = (props) => {
  return useMemo(() => (
    <FieldFileNotMemo {...props} />
  ), [props.value, props.disabled])
}
