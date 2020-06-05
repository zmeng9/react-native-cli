import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme, useNormalize } from '@/hooks'
import { IBaseColorType } from '@/themes'
import { ITextStyle, IPress } from './common'
import { Loading } from './Loading'


export interface IColorfulTextProps extends IPress {
  style?: ITextStyle['textStyle']
  color?: keyof IBaseColorType
  alwaysWhite?: boolean
  alwaysBlack?: boolean
  fontWeight?: `normal` | `bold` | `300`
  bold?: boolean
  lineHeight?: number
  text: string | number
  numberOfLines?: number
  margin?: number
  fontSize?: number
  textAlign?: `auto` | `center`
  isLoading?: boolean
}

export const ColorfulText: React.SFC<IColorfulTextProps> = observer(({
  style,
  color = `info`,
  alwaysWhite,
  alwaysBlack,
  fontWeight = `normal`,
  bold,
  text,
  numberOfLines,
  margin = 5,
  fontSize = 16,
  lineHeight = fontSize + 2,
  textAlign = `auto`,
  isLoading = false,
  onPress,
}) => {
  const { text: themeText } = useTheme()
  const { normalizeSize } = useNormalize()

  const fontColor = (() => {
    if (alwaysWhite)
      return `#fff`
    else if (alwaysBlack)
      return `#333`
    else
      return themeText[color]
  })()

  const renderText = () => (
    <Text
      numberOfLines={numberOfLines}
      style={[{
        fontSize: normalizeSize(fontSize),
        fontWeight,
        lineHeight,
        margin,
        color: fontColor,
        textAlign,
      }, {
        fontWeight: bold ? `bold` : `normal`,
      }, style]}
    >
      {text}
    </Text>
  )

  const renderContent = () => (
    isLoading
      ? (
        <View style={styles.root}>
          {renderText()}
          {isLoading && <Loading />}
        </View>
      )
      : renderText()
  )

  if (typeof onPress === `function`) {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        disabled={!(typeof onPress === `function`) || isLoading}
      >
        {renderContent()}
      </TouchableWithoutFeedback>
    )
  }
  else
    return renderContent()
})

const styles = StyleSheet.create({
  root: {
    flexDirection: `row`,
    alignItems: `center`,
  },
})