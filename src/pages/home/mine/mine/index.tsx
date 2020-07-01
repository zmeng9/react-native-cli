import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores } from '@/hooks'
import { UserInfo } from './UserInfo'


export const Mine: React.FC = observer(() => {
  const { globalStore } = useStores()
  const { authToken, userInfo } = globalStore

  return (
    <ScrollView style={styles.root}>
      <UserInfo authToken={authToken} userInfo={userInfo} />
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
  },
})