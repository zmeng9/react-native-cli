import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'
import { useTheme, useNormalize, usePlatform } from '@/hooks'
import { Icon } from './Icon'
import { Loading } from './Loading'


export interface ISelectProps extends PickerSelectProps {
  type?: `contain` | `outline` | `underline`
  size?: `large` | `small`
  leftIconName?: string
  rightIconName?: string
  leftComponent?: React.ReactElement
  rightComponent?: React.ReactElement
  isLoading?: boolean
  onPressRightIcon?: (...args: any) => void
}

export const Select: React.SFC<ISelectProps> = observer(({
  type = `outline`,
  size = `small`,
  leftIconName,
  rightIconName,
  leftComponent,
  rightComponent,
  isLoading,
  onPressRightIcon,
  ...selectProps
}) => {
  const { isIos } = usePlatform()
  const { normalizeSize } = useNormalize()
  const { input, divider, text } = useTheme()
  const isSmall = size === `small`


  const inputStyle = (() => {
    switch (type) {
      case `outline`:
        return { borderWidth: 0.7 }
      case `underline`:
        return { borderBottomWidth: 0.7 }
      default:
        return {}
    }
  })()

  const renderIcon = useCallback(() => (
    <Icon name='ios-arrow-down' size={isSmall ? 24 : 28} />
  ), [])

  return (
    <View style={styles.root}>
      {leftComponent && <View style={styles.leftComponent}>{leftComponent}</View>}
      {leftIconName && <Icon name={leftIconName} style={styles.leftComponent} size={isSmall ? 24 : 30} />}
      <RNPickerSelect
        Icon={isIos ? renderIcon : undefined}
        style={{
          viewContainer: {
            ...styles[size],
            borderColor: divider,
            backgroundColor: input[type],
            paddingLeft: (leftComponent || leftIconName) ? 40 : (isIos ? 10 : 0),
            paddingRight: (rightComponent || rightIconName) ? 40 : (isIos ? 5 : 0),
            ...inputStyle,
          },
          placeholder: {
            color: text.info,
            fontSize: isSmall ? normalizeSize(16) : normalizeSize(18),
          },
          inputIOS: {
            color: text.info,
            fontSize: isSmall ? normalizeSize(16) : normalizeSize(18),
          },
          inputIOSContainer: {
            justifyContent: `center`,
          },
        }}
        {...selectProps}
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
    justifyContent: `center`,
    marginVertical: 10,
    borderRadius: 15,
  },
  small: {
    height: 35,
    justifyContent: `center`,
    marginHorizontal: 10,
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