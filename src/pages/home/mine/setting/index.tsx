import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores, useSheet } from '@/hooks'
import { ScrollView, ListItem } from '@/components'


export const Setting: React.FC = observer(() => {
  const { globalStore } = useStores()
  const { showSheet } = useSheet()
  const {
    authToken,
    isLogout,
    setIsLogout,
    setUserInfo,
  } = globalStore

  const onLogout = useCallback(() => {
    showSheet([`确定退出登陆`], idx => {
      switch (idx) {
        case 0:
          setIsLogout(true)
          break
        default:
          break
      }
    }, true)
  }, [])

  return (
    <ScrollView style={styles.root}>
      <ListItem leftText='隐私' isNavigator />
      <ListItem leftText='版本号' rightText='v1.0.0' />
      {authToken && <ListItem type='center' text='退出登陆' textColor='error' onPress={onLogout} style={styles.logoutListItem} />}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  logoutListItem: {
    marginVertical: 10,
    paddingVertical: 0,
  }
})