import React from 'react'
import { View, StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Icon } from './Icon'
import { Loading } from './Loading'
import { useTheme, useNormalize } from '@/hooks'
import { ITextStyle } from './common'

export interface IInputProps {
  style?: ITextStyle['textStyle']
  value: string
  type?: `contain` | `outline` | `underline`
  size?: `large` | `small`
  leftIconName?: string
  rightIconName?: string
  isLoading?: boolean
  placeholder?: string
  editable?: boolean
  maxLength?: number
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  autoFocus?: boolean
  clearButtonMode?: `never` | `while-editing`
  returnKeyType?: `done` | `search` | `go`
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
  onPressRightIcon?: (...args: any) => void
}

export const Input: React.SFC<IInputProps> = observer(({
  style,
  value,
  type = `outline`,
  size = `small`,
  leftIconName,
  rightIconName,
  isLoading,
  placeholder = ``,
  editable = true,
  maxLength,
  secureTextEntry = false,
  keyboardType,
  autoFocus = false,
  clearButtonMode = `never`,
  returnKeyType = `done`,
  onChangeText,
  onSubmitEditing,
  onPressRightIcon,
}) => {
  const { normalizeSize } = useNormalize()
  const { input, divider, text } = useTheme()
  const isSmall = size === `small`


  const inputStyle = ((): ITextStyle['textStyle'] => {
    switch (type) {
      case `outline`:
        return { borderWidth: 0.7 }
      case `underline`:
        return { borderBottomWidth: 0.7 }
      default:
        return {}
    }
  })()

  return (
    <View style={styles.root}>
      {leftIconName && <Icon name={leftIconName} style={styles.leftIcon} size={isSmall ? 24 : 30} />}
      <TextInput
        style={[
          styles[size],
          {
            borderColor: divider,
            backgroundColor: input[type],
            paddingLeft: leftIconName ? 40 : 10,
            paddingRight: rightIconName ? 40: 10,
            color: text.info,
            fontSize: isSmall ? normalizeSize(16) : normalizeSize(18),
          },
          inputStyle,
          style,
        ]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        maxLength={maxLength}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
        placeholder={placeholder}
        clearButtonMode={clearButtonMode}
        enablesReturnKeyAutomatically
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />
      {rightIconName && <Icon name={rightIconName} style={styles.rightIcon} onPress={onPressRightIcon} size={isSmall ? 24 : 30} />}
      {isLoading && <Loading style={styles.rightIcon} />}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    justifyContent: `center`,
    position: `relative`,
  },
  large: {
    height: 40,
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  small: {
    height: 35,
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  leftIcon: {
    position: `absolute`,
    left: 10,
    zIndex: 1,
  },
  rightIcon: {
    position: `absolute`,
    right: 10,
    zIndex: 1,
  },
})