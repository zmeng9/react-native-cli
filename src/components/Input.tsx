import React from 'react'
import { View, StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Icon } from './Icon'
import { useTheme } from '@/hooks'
import { ITextStyle } from './common'

export interface IInputProps {
  style?: ITextStyle['textStyle']
  value: string
  type?: `contain` | `outline` | `underline`
  size?: `large` | `small`
  leftIcon?: React.ReactNode
  leftIconName?: string
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
}

export const Input: React.SFC<IInputProps> = observer(({
  style,
  value,
  type = `outline`,
  size = `small`,
  leftIcon,
  leftIconName,
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
}) => {
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
      {
        (leftIcon || leftIconName) && (
          <View style={styles.leftIconConatiner}>
            {leftIcon ? leftIcon : <Icon name={leftIconName as string} size={isSmall ? 24 : 30} />}
          </View>
        )
      }
      <TextInput
        style={[
          styles[size],
          {
            borderColor: divider,
            backgroundColor: input[type],
            paddingLeft: (leftIcon || leftIconName) ? 40 : 10,
            color: text.info,
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
    fontSize: 18,
    borderRadius: 15,
  },
  small: {
    height: 35,
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 16,
    borderRadius: 8,
  },
  leftIconConatiner: {
    position: `absolute`,
    left: 10,
    zIndex: 1,
  },
})