import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react-lite'
import { IBaseColorType } from '@/themes'
import { useTheme, useNormalize } from '@/hooks'
import { Loading } from './Loading'
import { IStyle, ITextStyle, IPress } from './common'


export interface IBtnProps extends IStyle, ITextStyle, IPress {
  text: string
  margin?: boolean
  color?: keyof IBaseColorType
  ghost?: boolean
  size?: `large` | `medium` | `small`
  fullWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
}

export const Btn: React.SFC<IBtnProps> = observer(({
  style,
  textStyle,
  text,
  margin = false,
  color = `info`,
  ghost,
  size = `medium`,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onPress,
}) => {
  const { btn, info } = useTheme()
  const { normalizeSize } = useNormalize()

  const fontSize = (() => {
    switch (size) {
      case `large`:
        return 18
      case `medium`:
        return 16
      case `small`:
        return 14
    }
  })()

  return (
    <View style={{ marginHorizontal: margin ? 5 : 0 }}>
      <TouchableOpacity
        style={[
          styles[size],
          {
            width: fullWidth ? `100%` : `auto`,
          },
          ghost ? {
            borderColor: info,
            borderWidth: 0.7,
          } : {
              backgroundColor: (isLoading || disabled) ? btn.bg.disabled : btn.bg[color],
            },
          style,
        ]}
        disabled={isLoading || disabled}
        onPress={onPress}
      >
        {
          isLoading
            ? <Loading />
            : (
              <Text
                style={[{
                  fontSize: normalizeSize(fontSize),
                  color: disabled ? btn.text.disabled : btn.text[color],
                  textAlign: `center`,
                }, textStyle]}>
                {text}
              </Text>
            )
        }
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  large: {
    height: 40,
    justifyContent: `center`,
    alignSelf: `center`,
    marginVertical: 10,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  medium: {
    height: 30,
    justifyContent: `center`,
    alignSelf: `center`,
    margin: 5,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  small: {
    height: 20,
    justifyContent: `center`,
    alignSelf: `center`,
    margin: 5,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
})