import React, { useCallback } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme, usePlatform } from '@/hooks'
import { IStyle, IChildren, IStartShouldSetResponderCapture, IPress, IBorder } from './common'
import { ColorfulText } from './ColorfulText'


export interface ICardProps extends IStyle, IChildren,
  IStartShouldSetResponderCapture, IPress, IBorder {
  cardHeaderStyle?: IStyle['style']
  cardBodyrStyle?: IStyle['style']
  cardFooterStyle?: IStyle['style']
  cardHeader?: React.ReactNode
  cardFooter?: React.ReactNode
  alwaysWhite?: boolean
  title?: string
  margin?: number
}

export interface ICardHeaderProps extends IStyle, IChildren, IBorder { }

export interface ICardFooterProps extends IStyle, IChildren, IBorder { }

export const Card: React.SFC<ICardProps> = observer(({
  style,
  cardHeaderStyle,
  cardBodyrStyle,
  cardFooterStyle,
  cardHeader,
  cardFooter,
  children,
  alwaysWhite,
  title,
  margin = 5,
  border,
  startShouldSetResponderCapture = false,
  onPress,
  onLongPress,
}) => {
  const { isAndroid } = usePlatform()
  const { paper, shadow, divider } = useTheme()

  const onStartShouldSetResponderCapture = useCallback(() => {
    return startShouldSetResponderCapture
  }, [])

  return (
    <TouchableWithoutFeedback
      disabled={!(typeof onPress === `function` || typeof onLongPress === `function`)}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View
        style={[
          styles.root,
          {
            margin,
            backgroundColor: alwaysWhite ? `#fff` : paper,
            borderWidth: border ? 0.7 : 0,
            borderColor: divider,
            elevation: isAndroid ? 2 : undefined,
            ...shadow,
          },
          style,
        ]}
        onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
      >
        {!!title && <ColorfulText text={title} bold fontSize={18} style={{ margin: 15 }} />}

        {
          cardHeader && (
            <CardHeader style={cardHeaderStyle}>
              {cardHeader}
            </CardHeader>
          )
        }

        <View style={[styles.cardBody, cardBodyrStyle]}>
          {children}
        </View>

        {
          cardFooter && (
            <View style={[styles.cardFooter, cardFooterStyle]}>
              {cardFooter}
            </View>
          )
        }

      </View>
    </TouchableWithoutFeedback>
  )
})

export const CardHeader: React.SFC<ICardHeaderProps> = observer(({
  style,
  children,
  border,
}) => {
  const { paper, shadow, divider } = useTheme()

  return (
    <View style={[
      styles.cardHeader,
      {
        backgroundColor: paper,
        borderTopWidth: border ? 0.7 : 0,
        borderLeftWidth: border ? 0.7 : 0,
        borderRightWidth: border ? 0.7 : 0,
        borderColor: divider,
        marginBottom: -0.7,
        ...shadow,
        shadowOffset: {
          width: 0,
          height: -10,
        },
      },
      style,
    ]}>
      {children}
    </View>
  )
})

export const CardFooter: React.SFC<ICardFooterProps> = observer(({
  style,
  children,
  border,
}) => {
  const { paper, shadow, divider } = useTheme()

  return (
    <View style={[
      styles.cardFooter,
      {
        backgroundColor: paper,
        borderColor: divider,
        borderBottomWidth: border ? 0.7 : 0,
        borderLeftWidth: border ? 0.7 : 0,
        borderRightWidth: border ? 0.7 : 0,
        ...shadow,
      },
      style,
    ]}>
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    borderRadius: 15,
    justifyContent: `space-between`,
  },
  cardHeader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  cardBody: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardFooter: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 10,
  },
})