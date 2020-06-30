import React from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react-lite'
import FastImage from 'react-native-fast-image'
import { useWindowSize } from '@/hooks'
import { IStyle } from './common'


const { width } = useWindowSize()

export interface IImgProps extends IStyle {
  uri: string
  width?: number
  height?: number
  borderRadius?: number
  resizeMode?: `contain` | `cover` | `stretch` | `center`
  onPress?: () => void
}

export const Img: React.SFC<IImgProps> = observer(({
  style,
  width,
  height,
  borderRadius = 0,
  uri,
  resizeMode = `contain`,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={!(typeof onPress === 'function')}>
      <FastImage
        style={[styles.root, { width, height, borderRadius }, style]}
        source={{
          uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode[resizeMode]}
      />
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  root: {
    width,
  },
})