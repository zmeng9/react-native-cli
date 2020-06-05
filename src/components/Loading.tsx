import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react-lite'
import { ColorfulText } from './ColorfulText'


export interface ILoadingProps {
  fullScreen?: boolean
  bottomText?: string
}

export const Loading: React.SFC<ILoadingProps> = observer(({
  fullScreen = false,
  bottomText,
}) => {
  return (
    <View style={[styles.root, fullScreen ? { flex: 1 } : {}]}>
      <ActivityIndicator style={styles.loading} />
      {bottomText && <ColorfulText text={bottomText} style={{ marginTop: 10 }} />}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    justifyContent: `center`,
  },
  loading: {
    margin: 5,
  },
})