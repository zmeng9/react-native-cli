import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
import { useStores, useGetUserInfo } from '@/hooks'


export const Recommend: React.FC = observer(() => {
  const headerHeight = useHeaderHeight()
  const { globalStore } = useStores()

  const { setHeaderHeight } = globalStore

  useGetUserInfo()

  // Set headerHeight
  setHeaderHeight(headerHeight)
  
  return (
    <View style={styles.root}>
      
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})