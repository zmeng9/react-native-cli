import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { TabBar } from 'react-native-tab-view'
import { useSafeArea } from 'react-native-safe-area-context'
import { useTheme, useNormalize } from '@/hooks'


export interface ITabbarProps {
  props: any
}

export interface ITabIndicatorProps {

}

export const Tabbar: React.SFC<ITabbarProps> = observer(({
  props,
}) => {
  const { normalizeSize } = useNormalize()
  const { paper, text, info } = useTheme()

  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: info,
      }}
      labelStyle={{
        color: text.info,
        fontSize: normalizeSize(16),
      }}
      style={[
        styles.root,
        {
          backgroundColor: paper,
        },
      ]}
    />
  )
})


const styles = StyleSheet.create({
  root: {
  },
  indicator: {
    width: 10,
    height: 1,
    backgroundColor: `#000`
  },
})