import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTheme } from '../hooks'
import { HomeTab as Home } from './home'
import { Search } from './search'



const Stack = createStackNavigator()

const StackNavigator: React.SFC = () => {
  const { backgroundColor } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='none'
      screenOptions={{
        cardStyle: { backgroundColor },
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
      />
      <Stack.Screen
        name='Search'
        component={Search}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator