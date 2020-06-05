import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@/hooks'
import { IStyle } from './common'


export interface IDividerProps extends IStyle {
  direction?: `vertical` | `horizontal`
}

export const Divider: React.SFC<IDividerProps> = observer(({
  style,
  direction = `horizontal`,
}) => {
  const { divider } = useTheme()

  return <View style={[styles.root, styles[direction], { backgroundColor: divider }, style]} />
})

const styles = StyleSheet.create({
  root: {

  },
  vertical: {
    height: 18,
    borderLeftWidth: 1,
    marginHorizontal: 5,
  },
  horizontal: {
    width: `100%`,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
})