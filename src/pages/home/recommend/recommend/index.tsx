import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import { useHeaderHeight, useLocation, useUserInfo } from '@/hooks'


export const Recommend: React.FC = observer(() => {
  const headerHeight = useHeaderHeight()


  // useUserInfo()
  useLocation()
  useHeaderHeight()

  
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