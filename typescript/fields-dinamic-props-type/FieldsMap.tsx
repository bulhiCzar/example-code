/* eslint-disable @typescript-eslint/no-unused-vars,prefer-destructuring */
import { get } from 'lodash'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FieldContent,
  FieldDate,
  FieldFields,
  FieldFile,
  FieldNumber,
  FieldSelect,
  FieldString,
  FieldSwitch,
  FieldArray,
  FieldCent,
  FieldFileId,
  FieldStringProps,
  FieldContentProps,
  FieldFileProps,
  FieldDateProps,
  FieldNumberProps,
  FieldSelectProps,
  FieldSwitchProps,
  FieldArrayProps,
  FieldFieldsProps,
  FieldCentProps,
  FieldFileIdProps, FieldJSON, FieldJSONProps,
} from './Field'

type FieldsTypes = FieldStringProps | FieldContentProps | FieldFileProps | FieldDateProps
  | FieldFieldsProps | FieldNumberProps | FieldSelectProps | FieldSwitchProps | FieldArrayProps
  | FieldCentProps | FieldFileIdProps | FieldJSONProps

export type Fields = (FieldsTypes & { hide?: (values: Record<string, any>) => boolean })[]

export interface FieldBase<T> {
  name: string
  value?: T
  onChange?: (value: T) => void
}

export interface FieldsProps {
  fields: Fields
}

export const FieldsMap = ({
  fields = [],
}: FieldsProps) => {
  const { watch, setValue } = useFormContext()
  const values = watch()

  const memo = useMemo(() => fields.map(({ hide, ...props }) => {
    const name = props.name
    const actions = {
      key: name,
      value: get(values, name),
      onChange: (v: any) => setValue(name, v),
    } as any

    if (hide && hide(values)) {
      return null
    }

    switch (props.type) {
      case 'fields':
        return <FieldFields key={props.name} {...props} />
      case 'string':
        return <FieldString {...props} {...actions} />
      case 'content':
        return <FieldContent {...props} {...actions} />
      case 'file':
        return <FieldFile {...props} {...actions} />
      case 'fileId':
        return <FieldFileId {...props} {...actions} />
      case 'date':
        return <FieldDate {...props} {...actions} />
      case 'number':
        return <FieldNumber {...props} {...actions} />
      case 'select':
        return <FieldSelect {...props} {...actions} />
      case 'switch':
        return <FieldSwitch {...props} {...actions} />
      case 'array':
        return <FieldArray {...props} {...actions} />
      case 'cent':
        return <FieldCent {...props} {...actions} />
      case 'json':
        return <FieldJSON {...props} {...actions} />
      default:
        return null
    }
  }), [fields, JSON.stringify(values)])

  return (
    <>
      {memo}
    </>
  )
}
