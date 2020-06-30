import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNormalize } from '@/hooks'
import { Img } from './Img'
import { Icon } from './Icon'
import { IStyle, IPress } from './common'

export interface IAvatarProps extends IStyle, IPress {
  local?: boolean
  uri: any
  size?: `large` | `medium` | `small`
}

export const Avatar: React.SFC<IAvatarProps> = observer(({
  local,
  style,
  uri,
  size = `medium`,
  onPress,
}) => {
  const { normalizeSize } = useNormalize()

  const imgSize = (() => {
    switch (size) {
      case `large`:
        return { width: normalizeSize(50), height: normalizeSize(50) }
      case `medium`:
        return { width: normalizeSize(40), height: normalizeSize(40) }
      case `small`:
        return { width: normalizeSize(30), height: normalizeSize(30) }
      default:
        return { width: normalizeSize(40), height: normalizeSize(40) }
    }
  })()

  return (
    local
      ? <Image source={uri} {...imgSize} style={[{ ...imgSize, borderRadius: 50 }]} />
      : (
        uri
          ? <Img uri={uri} borderRadius={50} onPress={onPress} style={[styles.root, style]} {...imgSize} />
          : <Icon name='ios-contact' size={50} style={style} />
      )
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 5,
  },
})