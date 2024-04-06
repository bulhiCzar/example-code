import React, { useMemo } from 'react'
import { noop } from 'lodash'

import { EditorContent, EditorContentProps } from '../../EditorContent'
import { Content } from '../../../../services/api/_types'
import { FieldBase } from '../FieldsMap'

type Base = FieldBase<Content[]> & Omit<EditorContentProps, 'value' | 'onChange'>

export interface FieldContentProps extends Base {
  type: 'content'
}

export const FieldContentNotMemo: React.FC<FieldContentProps> = ({
  value = [],
  onChange = noop,
  ...props
}) => {
  return (
    <EditorContent
      {...props}
      value={value}
      onChange={(content) => onChange(content)}
    />
  )
}

export const FieldContent: React.FC<FieldContentProps> = (props) => {
  return useMemo(() => (
    <FieldContentNotMemo {...props} />
  ), [props.value])
}
