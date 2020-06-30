import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { TabView as RnTabView, TabBar, SceneRendererProps } from 'react-native-tab-view'
import { useTheme, useWindowSize, useNormalize, useSafeArea } from '@/hooks'
import { IStyle } from './common'


const { width } = useWindowSize()

export interface ITabViewProps extends IStyle {
  routes: Array<{ key: string, title: string }>
  renderScene: (props: SceneRendererProps & {
    route: any
  }) => React.ReactNode
}

export const TabView: React.SFC<ITabViewProps> = observer(({
  style,
  routes,
  renderScene,
}) => {
  const { normalizeSize } = useNormalize()
  const { paper, text, info } = useTheme()
  const { top } = useSafeArea()
  const [index, setIndex] = useState(0)

  return (
    <RnTabView
      style={[styles.root, style]}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={props => (
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
              paddingTop: top,
              backgroundColor: paper,
            },
          ]}
        />
      )}
      onIndexChange={setIndex}
      initialLayout={{ width }}
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