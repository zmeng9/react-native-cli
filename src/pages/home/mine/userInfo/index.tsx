import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks'
import { ListItem, Avatar, ScrollView } from '@/components'


export const UserInfo: React.FC = observer(() => {
  const { globalStore } = useStores()
  const { userInfo } = globalStore
  const { username, nickname, avatar, mobile } = userInfo

  const renderAvatar = useCallback(() => (
    <Avatar uri={avatar} />
  ), [])

  return (
    <ScrollView style={styles.root}>
      <ListItem leftComponent={renderAvatar()} rightText={username} style={styles.avatarListItem} />
      <ListItem leftText='昵称' rightText={nickname} placeHolder isNavigator />
      <ListItem leftText='手机号' rightText={mobile} placeHolder isNavigator />
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  avatarListItem: {
    marginTop: 5,
    marginBottom: 15,
  },
})