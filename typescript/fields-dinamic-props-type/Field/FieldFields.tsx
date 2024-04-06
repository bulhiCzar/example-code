import React, { MouseEventHandler } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import {
  Add as AddIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

import { Fields, FieldsMap } from '../FieldsMap'
import { Accordion } from '../../Accordion'
import { Button } from '../../Button'

export interface FieldFieldsProps {
  type: 'fields'
  name: string
  label: string
  fields: Fields
}
export const FieldFields: React.FC<FieldFieldsProps> = ({
  name,
  label,
  fields: fieldsProps,
}) => {
  const { control } = useFormContext()
  const { fields, append, remove, move } = useFieldArray({
    control,
    name,
    shouldUnregister: true,
  })

  const handlerAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    append(fieldsProps.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}))
  }

  return (
    <Accordion
      label={(
        <Stack direction="row" justifyContent="space-between">
          <span>{label}</span>
          <Button
            onClick={handlerAdd}
            sx={{ ml: 2 }}
            color="secondary"
          >
            <AddIcon />
          </Button>
        </Stack>
      )}
      className="controller"
      defaultExpanded
    >
      {!fields.length &&
      <Stack direction="row" justifyContent="center">
        <Typography>Пусто</Typography>
      </Stack>
      }
      {fields.map((field, idx) => {
        return (
          <Accordion
            // eslint-disable-next-line react/no-array-index-key
            key={field.id}
            className="filter"
            label={`${label}: #${idx + 1}`}
            defaultExpanded
          >
            <div>
              <Button color="error" onClick={() => remove(idx)}>
                <DeleteIcon />
              </Button>
              <Button
                disabled={!idx}
                onClick={() => move(idx, idx - 1)}
                color="info"
              >
                <ArrowUpwardIcon />
              </Button>
              <Button
                disabled={fields.length - 1 === idx}
                onClick={() => move(idx, idx - 1)}
                color="info"
              >
                <ArrowDownwardIcon />
              </Button>
            </div>
            <FieldsMap
              fields={fieldsProps.map((props) => ({
                ...props,
                name: `${name}.${idx}.${props.name}`,
              }))}
            />
          </Accordion>
        )
      })}
    </Accordion>
  )
}
