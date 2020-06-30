import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { IChildren } from './common'


export interface IBtnGroupProps extends IChildren {

}

export const BtnGroup: React.SFC<IBtnGroupProps> = observer(({
  children,
}) => {
  return (
    <View style={styles.root}>
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    
  }
})