import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useWindowSize } from '@/hooks'
import { Card } from './Card'
import { Collapsible } from './Collapsible'
import { ColorfulText } from './ColorfulText'
import { Swipeout } from './Swipeout'
import { Avatar } from './Avatar'
import { Btn } from './Btn'
import { IStyle, IPress } from './common'


const { width } = useWindowSize()

export interface IVCardProps extends IStyle, IPress {
  collapsed?: boolean
  title: string
  logo?: any
  close?: boolean
  headerRightText: string
  leftText: string
  rightText: string
  onUnbundle: () => void
  onRecharge: () => void
  onWithdraw: () => void
}

export const VCard: React.FC<IVCardProps> = observer(({
  collapsed,
  style,
  title,
  logo,
  close,
  headerRightText,
  leftText,
  rightText,
  onPress,
  onUnbundle,
  onRecharge,
  onWithdraw,
}) => {
  const renderCardHeader = useCallback(() => (
    <>
      <View style={styles.topLeftComponent}>
        {logo && <Avatar local uri={logo} size='small' />}
        <ColorfulText text={title} bold />
      </View>
      <ColorfulText text={headerRightText} />
    </>
  ), [])

  const renderCardFooter = useCallback(() => (
    <>
      <ColorfulText text={leftText} />
      {!!rightText && <ColorfulText text={rightText} bold />}
    </>
  ), [])

  const rightBtns = [
    <View style={styles.btnGroup}>
      <Btn style={styles.rechargeBtn} text='充值' color='primary' onPress={onRecharge} />
      <Btn style={styles.withdrawBtn} text='提现' onPress={onWithdraw} />
      <Btn style={styles.removeBtn} text='解绑' color='error' onPress={onUnbundle} />
    </View>
  ]

  return (
    <Collapsible collapsed={collapsed} collapsedHeight={50}>
      <Swipeout buttonWidth={88 * 3 + 10} close={close} rightBtns={rightBtns} disabled={collapsed} style={{ marginBottom: 10 }}>
        <Card
          border
          style={[styles.root, style]}
          cardHeader={renderCardHeader()}
          cardFooter={renderCardFooter()}
          onPress={onPress}
        />
      </Swipeout>
    </Collapsible>
  )
})

const styles = StyleSheet.create({
  root: {
    marginVertical: 0,
    width: width - 10,
    aspectRatio: 3,
    elevation: 0,
  },
  topLeftComponent: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  btnGroup: {
    width: 88 * 3 + 10,
    height: `100%`,
    justifyContent: `flex-end`,
    flexDirection: `row`,
  },
  rechargeBtn: {
    height: `100%`,
    width: 88,
    margin: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  withdrawBtn: {
    height: `100%`,
    width: 88,
    marginVertical: 0,
    marginHorizontal: 2,
    borderRadius: 0,
  },
  removeBtn: {
    height: `100%`,
    width: 88,
    marginVertical: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
})