/* eslint-disable @typescript-eslint/no-unused-vars */
import { noop } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'

import { InputProps } from '../../Input'
import { FieldNumber, FieldNumberNotMemo, FieldNumberProps } from './FieldNumber'
import { toCent, toDollar } from '../../../utils'
import { InputAdornment } from '@mui/material'

type Base = Omit<FieldNumberProps, 'type'> & Omit<InputProps, 'type' | 'name' | 'value' | 'onChange'>

export interface FieldCentProps extends Base {
  type: 'cent'
}

function formatNumber(n: string) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '')
}

function formatCurrency(value: string | number = '') {
  let inputValue = String(value)
  if (inputValue === '') { return '' }
  if (inputValue.indexOf('.') >= 0) {
    let decimalPos = inputValue.indexOf('.')
    let leftSide = inputValue.substring(0, decimalPos)
    let rightSide = inputValue.substring(decimalPos)
    leftSide = formatNumber(leftSide)
    rightSide = formatNumber(rightSide)
    rightSide = rightSide.substring(0, 2)
    inputValue = `${leftSide}.${rightSide}`
  } else {
    inputValue = formatNumber(inputValue)
  }
  return inputValue
}

export const FieldCentNotMemo: React.FC<FieldCentProps> = ({
  onChange = noop,
  value: v,
  ...props
}) => {
  const [value, setValue] = useState<number | string>('')

  const handlerInput = (dollar: number) => {
    setValue(String(dollar))
    onChange(toCent(dollar))
  }

  useEffect(() => {
    const d = toDollar(v)
    if (Number(d) !== Number(value)) {
      setValue(d.toString())
    }
  }, [v])

  return (
    <FieldNumber
      {...props}
      type="number"
      value={formatCurrency(value) as any}
      onChange={handlerInput}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  )
}

export const FieldCent: React.FC<FieldCentProps> = (props) => {
  return useMemo(() => (
    <FieldCentNotMemo {...props} />
  ), [props.value, props.disabled])
}
