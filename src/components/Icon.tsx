import React from 'react'
import VIcon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme, useNormalize } from '@/hooks'
import { IBaseColorType } from '@/themes'
import { ColorfulText } from './ColorfulText'
import { IStyle, IPress } from './common'


export interface IIconProps extends IStyle, IPress {
  name: string
  bottomText?: string
  size?: number
  alwaysWhite?: boolean
  alwaysBlack?: boolean
  color?: keyof IBaseColorType
}

export const Icon: React.SFC<IIconProps> = ({
  style,
  name,
  bottomText,
  size = 28,
  alwaysWhite,
  alwaysBlack,
  color = `info`,
  onPress,
}) => {
  const theme = useTheme()
  const { normalizeSize } = useNormalize()

  const iconColor = (() => {
    if (alwaysWhite)
      return `#fff`
    else if (alwaysBlack)
      return `#333`
    else
      return theme[color]
  })()

  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress} disabled={!(typeof onPress === `function`)}>
      <VIcon name={name} size={normalizeSize(size)} color={iconColor} />
      {bottomText && <ColorfulText text={bottomText} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    alignItems: `center`,
    justifyContent: `center`,
  },
})