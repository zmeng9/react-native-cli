import React from 'react'
import { Navigator, Screen } from '@/components'
import { HomeTab as Home } from './home'
import { Search } from './search'


const StackNavigator: React.SFC = () => {
  return (
    <Navigator>
      <Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name='Search'
        component={Search}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  )
}

export default StackNavigator