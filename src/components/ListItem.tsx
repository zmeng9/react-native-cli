import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card } from './Card'
import { Icon } from './Icon'
import { ColorfulText } from './ColorfulText'
import { IBaseColorType } from '@/themes'
import { IStyle, ITextStyle, IPress, IBorder, IPressWithName } from './common'


export interface IListItemProps extends IStyle, IPress, IBorder {
  isNavigator?:       boolean
  isTitle?:           boolean
  textColor?:         keyof IBaseColorType
  type?:              `space-between` | `center`
  leftStyle?:         IStyle['style']
  rightStyle?:        IStyle['style']
  textStyle?:         ITextStyle['textStyle']
  leftTextStyle?:     ITextStyle['textStyle']
  rightTextStyle?:    ITextStyle['textStyle']
  text?:              string | null
  leftText?:          string | null
  rightText?:         string | null
  placeHolder?:       string | null | boolean
  leftIconName?:      string | null
  rightIconName?:     string | null | Array<IPressWithName>
  leftComponent?:     React.ReactNode
  rightComponent?:    React.ReactNode
  onPressLeftText?:   (...args: any) => void
  onPressRightText?:  (...args: any) => void
  onPressRightIcon?:  (...args: any) => void
}

export const ListItem: React.SFC<IListItemProps> = observer(({
  style,
  border,
  textStyle,
  leftStyle,
  rightStyle,
  leftTextStyle,
  rightTextStyle,
  type = `space-between`,
  textColor,
  isNavigator = false,
  isTitle = false,
  text,
  leftText,
  rightText,
  placeHolder,
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
    <Card border={border} onPress={onPress} style={[isTitle ? {} : styles.root, style]} startShouldSetResponderCapture={typeof onPress === `function`}>
      {
        type === `center`
          ? (!!text && (
            <ColorfulText
              style={textStyle}
              text={text}
              color={textColor}
              textAlign='center'
            />
          ))
          : (
            <View style={styles.container}>
              <View style={[styles.leftContainer, leftStyle]}>
                {!!leftIconName && <Icon name={leftIconName} size={24} style={{ paddingHorizontal: 5 }} />}
                {!!leftText && (
                  <ColorfulText
                    style={leftTextStyle}
                    text={leftText}
                    color={textColor}
                    onPress={onPressLeftText}
                  />
                )}
                {leftComponent}
              </View>

              <View style={[styles.rightContainer, rightStyle]}>
                {rightComponent}
                {(!!rightText && !placeHolder) && (
                  <ColorfulText
                    style={rightTextStyle}
                    text={rightText}
                    color={textColor}
                    onPress={onPressRightText}
                  />
                )}
                {(!!placeHolder && !rightText) && (
                  <ColorfulText
                    style={rightTextStyle}
                    text={(typeof placeHolder === `boolean` ? `暂无` : placeHolder)}
                    color='secondary'
                    onPress={onPressRightText}
                  />
                )}
                {!!rightIconName && (
                  typeof rightIconName === `string`
                    ? <Icon name={rightIconName} size={24} onPress={onPressRightIcon} />
                    : rightIconName.map((item, idx) => <Icon key={idx} name={item.name} size={24} onPress={item.onPress} />)
                )}
                {isNavigator && <Icon name='ios-arrow-forward' style={{ paddingRight: 3 }} size={24} />}
              </View>
            </View>
          )
      }
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 0,
    borderRadius: 0,
    paddingVertical: 5,
  },
  container: {
    marginHorizontal: 5,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  leftContainer: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  rightContainer: {
    flexDirection: `row`,
    alignItems: `center`,
  },
})