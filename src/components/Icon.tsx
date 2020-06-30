import React from 'react'
import VIcon from 'react-native-vector-icons/Ionicons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme, useNormalize } from '@/hooks'
import { IBaseColorType } from '@/themes'
import { ColorfulText } from './ColorfulText'
import { IStyle, IPress } from './common'


export interface IIconProps extends IStyle, IPress {
  iconStyle?: IStyle['style']
  name: string
  bottomText?: string
  size?: number
  iconBg?: boolean
  alwaysWhite?: boolean
  alwaysBlack?: boolean
  color?: keyof IBaseColorType
}

export const Icon: React.SFC<IIconProps> = ({
  style,
  iconStyle,
  name,
  bottomText,
  size = 28,
  iconBg,
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
      <View style={[iconBg ? [styles.iconBg, { backgroundColor: theme.paper }] : {}, iconStyle]}>
        <VIcon name={name} size={normalizeSize(size)} color={iconColor} />
      </View>
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
  iconBg: {
    justifyContent: `center`,
    alignItems: `center`,
    width: 55,
    height: 55,
    borderRadius: 15,
    marginBottom: 5,
  },
})