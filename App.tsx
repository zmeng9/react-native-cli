import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import 'mobx-react-lite/batchingForReactNative'
import moment from 'moment'
import 'moment/locale/zh-cn'
import SplashScreen from 'react-native-splash-screen'
import Reactotron from 'reactotron-react-native'
import StackNavigator from '@/pages'
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDarkModeContext } from 'react-native-dark-mode'
import { StoresContext, stores } from '@/stores'
import { ThemeContext, themes } from '@/themes'
import { navigationRef, isMountedRef } from '@/utils'
import { zh_cn } from '@/locales'


/* 
 * 1. Start config when the development environment
 * 2. Import reactotron to watch changes in mst 
 */


if (__DEV__) {
  import('./reactotron.config')
    .then(() => {
      Reactotron.trackMstNode!(stores)
    })
}

console.disableYellowBox = true


/* 
 * update locale
 */


moment.updateLocale(`zh-cn`, {
  relativeTime: zh_cn.relativeTime,
})

const AppContainer: React.SFC = () => {
  const mode = useDarkModeContext()

  // Hide the screen image
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  // Set the mounted ref
  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return (
    <ThemeContext.Provider value={themes[mode]}>
      <StoresContext.Provider value={stores}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar
              animated
              backgroundColor={themes[mode].paper}
              barStyle={mode === `light` ? `dark-content` : `light-content`}
            />
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </StoresContext.Provider>
    </ThemeContext.Provider>
  )
}


/* 
 * connectd action sheet
 */


const ConnectedApp = connectActionSheet(AppContainer)

const App: React.SFC = () => (
  <ActionSheetProvider>
    <ConnectedApp />
  </ActionSheetProvider>
)

export default App