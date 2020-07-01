import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Header } from './Header'
import { useStores, useResetStores } from '@/hooks'


export const Search: React.FC = observer(() => {
  const { searchStore } = useStores()
  const {
    keyword,
    setKeyword,
  } = searchStore

  useResetStores(searchStore)

  const handleSubmit = useCallback(() => {
    
  }, [keyword])

  return (
    <View style={styles.root}>
      <Header
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSubmit}
      />
      
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 20,
  },
})