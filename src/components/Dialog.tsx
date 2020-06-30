import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnDialog from 'react-native-dialog'
import { IVisible, IPress } from './common'


export interface IDialogProps extends IVisible, IPress {
  title: string
  desc?: string
  onOk: (...args: any) => void
  onCancel: (...args: any) => void
}

export const Dialog: React.SFC<IDialogProps> = observer(({
  visible,
  title = `确定执行此操作码`,
  desc,
  onOk,
  onCancel,
}) => {
  return (
    <RnDialog.Container visible={visible}>
      <RnDialog.Title>{title}</RnDialog.Title>
      {desc && <RnDialog.Description>{desc}</RnDialog.Description>}
      <RnDialog.Button label='取消' onPress={onCancel} />
      <RnDialog.Button label='确定' onPress={onOk} />
    </RnDialog.Container>
  )
})

const styles = StyleSheet.create({
  root: {

  }
})