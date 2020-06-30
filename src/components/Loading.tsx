import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react-lite'
import { ColorfulText } from './ColorfulText'
import { IStyle } from './common'


export interface ILoadingProps extends IStyle {
  fullScreen?: boolean
  bottomText?: string
}

export const Loading: React.SFC<ILoadingProps> = observer(({
  style,
  fullScreen = false,
  bottomText,
}) => {
  return (
    <View style={[styles.root, fullScreen ? { flex: 1 } : {}, style]}>
      <ActivityIndicator style={styles.loading} />
      {bottomText && <ColorfulText text={bottomText} style={{ marginTop: 10 }} />}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    justifyContent: `center`,
    alignItems: `center`,
  },
  loading: {
    margin: 5,
  },
})