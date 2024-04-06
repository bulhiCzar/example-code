import React, { useEffect, useMemo, useState } from 'react'

import { Input, InputProps } from '../../Input'
import { FieldBase } from '../FieldsMap'
import { Button } from '../../Button'
import { Visibility } from '@mui/icons-material'
import { getFilesIdFx } from '../../../../states/Files/event'
import { $filesId, $filesIdLoading } from '../../../../states/Files/store'
import { useStore } from 'effector-react'
import { Modal } from '../../Modal'
import { RemoteFile } from '../../RemoteFile'

type Base<T> = FieldBase<T> & Omit<InputProps, 'name' | 'value'>

export interface FieldFileIdProps extends Base<string | string[]> {
  type: 'fileId'
}
const FieldFileIdNotMemo: React.FC<FieldFileIdProps> = ({
  value: fileId,
  ...props
}) => {
  const file = useStore($filesId)
  const filesIdLoading = useStore($filesIdLoading)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (fileId) {
      getFilesIdFx({
        id: Number(fileId),
      })
    }
  }, [fileId])

  return (
    <>
      <Input
        {...props}
        value={fileId}
        InputProps={{
          endAdornment: (
            <>
              <Button
                color="secondary"
                variant="contained"
                loading={filesIdLoading}
                disabled={!file.url}
                onClick={() => setOpen(true)}
              >
                <Visibility />
              </Button>
            </>
          ),
        }}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <RemoteFile
          src={file.url as string}
          style={{
            maxHeight: 'inherit',
          }}
        />
      </Modal>
    </>
  )
}

export const FieldFileId: React.FC<FieldFileIdProps> = (props) => {
  return useMemo(() => (
    <FieldFileIdNotMemo {...props} />
  ), [props.value, props.disabled])
}
