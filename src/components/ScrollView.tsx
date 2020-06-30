import React from 'react'
import { StyleSheet, ScrollView as RnScrollView } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useSafeArea } from '@/hooks'
import { IChildren, IStyle } from './common'


export interface IScrollViewProps extends IChildren, IStyle {

}

export const ScrollView: React.SFC<IScrollViewProps> = observer(({
  style,
  children,
}) => {
  const { bottom } = useSafeArea()

  return (
    <RnScrollView
      alwaysBounceVertical
      contentContainerStyle={[
        styles.root,
        {
          paddingBottom: bottom || 10,
        },
        style,
      ]}
      scrollIndicatorInsets={{ right: 1 }}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='handled'
    >
      {children}
    </RnScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
  },
})