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
  leftComponent?: React.ReactElement
  rightComponent?: React.ReactElement
  isLoading?: boolean
  placeholder?: string
  editable?: boolean
  maxLength?: number
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  autoFocus?: boolean
  autoCompleteType?: `off` | `username` | `tel`
  clearButtonMode?: `never` | `while-editing`
  returnKeyType?: `done` | `search` | `go`
  onChangeText?: (text: string) => void
  onSubmitEditing?: () => void
  onPressRightIcon?: (...args: any) => void
}

export const Input: React.SFC<IInputProps> = observer(({
  style,
  value,
  type = `outline`,
  size = `large`,
  leftIconName,
  rightIconName,
  leftComponent,
  rightComponent,
  isLoading,
  placeholder = ``,
  editable = true,
  maxLength,
  secureTextEntry = false,
  keyboardType,
  autoFocus = false,
  autoCompleteType = `off`,
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
      {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}
      {leftIconName && <Icon name={leftIconName} style={styles.leftComponent} size={isSmall ? 24 : 30} />}
      <TextInput
        style={[
          styles[size],
          {
            borderColor: divider,
            backgroundColor: input[type],
            paddingLeft: (leftComponent || leftIconName) ? 40 : 10,
            paddingRight: (rightComponent || rightIconName) ? 40 : 10,
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
        autoCompleteType={autoCompleteType}
        placeholder={placeholder}
        clearButtonMode={clearButtonMode}
        enablesReturnKeyAutomatically
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
      />
      {(!isLoading && rightIconName) && (
        <Icon
          name={rightIconName}
          style={styles.rightComponent}
          onPress={onPressRightIcon}
          size={isSmall ? 24 : 30}
        />
      )}
      {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      {isLoading && <Loading style={styles.rightComponent} />}
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
    marginVertical: 5,
    borderRadius: 8,
  },
  leftComponent: {
    position: `absolute`,
    left: 2,
    zIndex: 1,
  },
  rightComponent: {
    position: `absolute`,
    right: 2,
    zIndex: 1,
  },
})