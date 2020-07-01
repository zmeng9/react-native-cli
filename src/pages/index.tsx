import React, { useEffect } from 'react'
import { Navigator, Screen } from '@/components'
import { useStores } from '@/hooks'
import { loadAuthToken } from '@/utils'
import { HomeTab as Home } from './home'
import { Login } from './login'
import { Reg } from './reg'
import { Search } from './search'


const StackNavigator: React.SFC = () => {
  const { globalStore } = useStores()
  const { isLogout, setAuthToken } = globalStore

  useEffect(() => {
    (async () => {
      const authToken = await loadAuthToken()
      setAuthToken(authToken)
    })()
  }, [])

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
      <Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
          animationTypeForReplace: isLogout ? `pop` : `push`,
        }}
      />
      <Screen
        name='Reg'
        component={Reg}
        options={{
          headerTitle: `注册`,
        }}
      />
    </Navigator>
  )
}

export default StackNavigator