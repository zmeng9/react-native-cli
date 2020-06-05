import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card } from './Card'
import { Icon } from './Icon'
import { ColorfulText } from './ColorfulText'
import { IBaseColorType } from '@/themes'
import { IStyle, ITextStyle, IPress } from './common'

export interface IListItemProps extends IStyle, IPress {
  textStyle?: ITextStyle['textStyle']
  leftStyle?: IStyle['style']
  rightStyle?: IStyle['style']
  leftTextStyle?: ITextStyle['textStyle']
  rightTextStyle?: ITextStyle['textStyle']
  type?: `space-between` | `center`
  colorfulTextType?: keyof IBaseColorType
  text?: string
  isNavigator?: boolean
  leftText?: string
  rightText?: string
  leftIconName?: string
  rightIconName?: string | Array<{
    name: string
    onPress: (...args: any) => void
  }>
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  onPressLeftText?: (...args: any) => void
  onPressRightText?: (...args: any) => void
  onPressRightIcon?: (...args: any) => void
}

export const ListItem: React.SFC<IListItemProps> = observer(({
  style,
  textStyle,
  leftStyle,
  rightStyle,
  leftTextStyle,
  rightTextStyle,
  type = `space-between`,
  colorfulTextType,
  isNavigator = false,
  text,
  leftText,
  rightText,
  leftIconName,
  rightIconName,
  leftComponent,
  rightComponent,
  onPress,
  onPressLeftText,
  onPressRightText,
  onPressRightIcon,
}) => {
  return (
    <Card onPress={onPress} style={style} startShouldSetResponderCapture={typeof onPress === `function`}>
      {
        type === `center`
          ? (!!text && (
            <ColorfulText
              style={textStyle}
              text={text}
              color={colorfulTextType}
              textAlign='center'
            />
          ))
          : (
            <View style={styles.root}>
              <View style={styles.leftContainer}>
                {leftComponent && (
                  <View style={[styles.leftComponent, leftStyle]}>
                    {leftComponent}
                  </View>
                )}
                {leftIconName && <Icon name={leftIconName} size={24} />}
                {!!leftText && (
                  <ColorfulText
                    style={leftTextStyle}
                    text={leftText}
                    color={colorfulTextType}
                    onPress={onPressLeftText}
                  />
                )}
              </View>

              <View style={styles.rightContainer}>
                {rightComponent && (
                  <View style={[styles.rightComponent, rightStyle]}>
                    {rightComponent}
                  </View>
                )}
                {!!rightText && (
                  <ColorfulText
                    style={rightTextStyle}
                    text={rightText}
                    color={colorfulTextType}
                    onPress={onPressRightText}
                  />
                )}
                {rightIconName && (
                  typeof rightIconName === `string`
                    ? <Icon name={rightIconName} size={24} onPress={onPressRightIcon} />
                    : rightIconName.map((item, idx) => <Icon key={idx} name={item.name} size={24} onPress={item.onPress} />)
                )}
                {isNavigator && <Icon name='ios-arrow-forward' size={24} />}
              </View>
            </View>
          )
      }
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 5,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  leftContainer: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  rightContainer: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  leftComponent: {

  },
  rightComponent: {

  },
})