import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@/components'
import { useTheme } from '@/hooks'
import { MineNavigator as Mine } from './mine'
import { RecommendNavigator as Recommend } from './recommend'


const Tab = createBottomTabNavigator()

export const HomeTab: React.SFC = () => {
  const { paper, divider } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Recommend'
      tabBarOptions={{
        style: {
          backgroundColor: paper,
          borderTopColor: divider,
        },
        activeTintColor: `#333`,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const routeName = route.name

          switch (routeName) {
            case `Mine`:
              return <Icon name='ios-person' color={focused ? `info` : `secondary`} />
            case `Recommend`:
              return <Icon name='ios-home' color={focused ? `info` : `secondary`} />
            default:
              return <Icon name='ios-person' color={focused ? `info` : `secondary`} />
          }
        },
      })}
    >
      <Tab.Screen
        name='Recommend'
        component={Recommend}
        options={{
          tabBarLabel: `首页`,
        }}
      />
      <Tab.Screen
        name='Mine'
        component={Mine}
        options={{
          tabBarLabel: `我的`,
        }}
      />
    </Tab.Navigator>
  )
}