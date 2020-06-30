import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme, useWindowSize } from '@/hooks'
import { Card } from './Card'
import { Icon } from './Icon'
import { ColorfulText } from './ColorfulText'
import { IStyle, IPress } from './common'


const { width } = useWindowSize()

export interface IMoneyProps extends IStyle, IPress {
  headerRightText?: string
  leftText?: string
  rightText?: string
  isLock?: boolean
}

export const Money: React.SFC<IMoneyProps> = observer(({
  style,
  headerRightText,
  leftText,
  rightText,
  isLock,
  onPress,
}) => {
  const { btn } = useTheme()

  const renderCardHeader = () => (
    <>
      {headerRightText && <ColorfulText text={headerRightText} />}
      { isLock && <Icon name='ios-lock' size={22} /> }
    </>
  )

  const renderCardFooter = () => (
    <>
      {!!leftText && <ColorfulText text={leftText} />}
      {!!rightText && <ColorfulText text={rightText} />}
    </>
  )

  return (
    <Card
      border
      style={[styles.root, style]}
      cardHeader={renderCardHeader()}
      cardFooter={renderCardFooter()}
      onPress={onPress}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    width: width - 10,
    aspectRatio: 3,
  },
})