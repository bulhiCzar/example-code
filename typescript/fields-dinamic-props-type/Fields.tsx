import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FieldsMap, Fields as FieldsType } from './FieldsMap'
import { useDebounce } from '../../hooks'

export interface FieldsProps<T = unknown> {
  fields: FieldsType
  onChange?: (values: T) => void
  value?: T
  isDebounce?: boolean
}

export const Fields = <T, >({
  fields = [],
  onChange = () => null,
  value,
  isDebounce,
}: FieldsProps<T>) => {
  const form = useForm<T>({
    defaultValues: (value || {}) as any,
  })
  const { watch, setValue } = form
  const valuesWatch = watch() as Record<string, unknown>
  const valuesDebounce = useDebounce(valuesWatch, 300)

  useEffect(() => {
    if (isDebounce) {
      onChange(valuesDebounce as T)
    }
  }, [JSON.stringify(valuesDebounce)])

  useEffect(() => {
    if (!isDebounce) {
      onChange(valuesWatch as T)
    }
  }, [JSON.stringify(valuesWatch)])

  useEffect(() => {
    Object.entries(value || {})
      .map(([key, value]) => setValue(key as any, value as any))
  }, [JSON.stringify(value)])

  return (
    <FormProvider {...form}>
      <FieldsMap fields={fields} />
    </FormProvider>
  )
}
