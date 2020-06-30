import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnSwipeout, { SwipeoutProperties, SwipeoutButtonProperties } from 'react-native-swipeout'
import { useTheme } from '@/hooks'
import { IChildren } from './common'


export interface ISwipeoutProps extends SwipeoutProperties, IChildren {
  buttonWidth?: number
  close?: boolean
  rightBtns: Array<JSX.Element>
}

export const Swipeout: React.SFC<ISwipeoutProps> = observer(({
  style,
  children,
  buttonWidth,
  close,
  rightBtns,
  ...swipeoutProps
}) => {
  const { backgroundColor } = useTheme()

  const _rightBtns: Array<SwipeoutButtonProperties> = rightBtns.map(component => ({
    backgroundColor,
    component,
  }))

  return (
    <RnSwipeout
      autoClose
      close={close}
      right={_rightBtns}
      buttonWidth={buttonWidth || 100}
      style={[styles.root, { backgroundColor }, style]}
      {...swipeoutProps}
    >
      {children}
    </RnSwipeout>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})