import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Img } from './Img'
import { IStyle, IPress } from './common'

export interface IAvatarProps extends IStyle, IPress {
  uri: string
  size?: `large` | `small`
}

export const Avatar: React.SFC<IAvatarProps> = observer(({
  style,
  uri,
  size = `small`,
  onPress,
}) => {
  const imgSize = size === `large`
    ? { width: 50, height: 50 }
    : { width: 40, height: 40 }
  return <Img uri={uri} borderRadius={50} onPress={onPress} style={style} {...imgSize} />
})

const styles = StyleSheet.create({
  root: {
  },
})