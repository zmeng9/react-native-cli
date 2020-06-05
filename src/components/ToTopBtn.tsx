import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { goToRecommend } from '@/utils'
import { Btn } from './Btn'
import { IStyle } from './common'


export interface IToTopBtnProps extends IStyle {
  text?: string
}

export const ToTopBtn: React.SFC<IToTopBtnProps> = observer(({
  style,
  text = `返回`,
}) => {
  return (
    <Btn
      style={[{ width: 120 }, style]}
      color='success'
      size='large'
      text={text}
      onPress={goToRecommend}
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
})