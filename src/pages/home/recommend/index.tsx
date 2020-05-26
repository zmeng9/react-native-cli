import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { useTheme } from '@/hooks'
import { Recommend } from './recommend'
import { Icon } from '@/components'
import { goToSearch } from '@/utils'

const Stack = createStackNavigator()

export const RecommendStackNavigator: React.SFC = () => {
  const { text, paper, divider, shadowOffset, backgroundColor } = useTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: text.info,
        headerBackTitleVisible: false,
        headerTitleAlign: `center`,
        headerStyle: {
          backgroundColor: paper,
          borderBottomColor: divider,
          shadowOffset,
        },
        cardStyle: {
          backgroundColor,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name='Recommend'
        component={Recommend}
        options={{
          headerTitle: `首页`,
          headerRight: () => <Icon name='ios-search' handle={goToSearch} />,
        }}
      />
    </Stack.Navigator>
  )
}