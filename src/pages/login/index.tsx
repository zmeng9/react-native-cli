import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores, useSumbit } from '@/hooks'
import { TabView } from '@/components'
import { PwdLogin } from './PwdLogin'
import { VcodeLogin } from './VcodeLogin'


export const Login: React.FC = observer(() => {
  const { globalStore, loginStore } = useStores()
  const { onSumbit } = useSumbit(loginStore)

  const {
    isLoading,
    isSubmit,
    routes,
    username,
    password,
    mobile,
    vcode,
    isUnameOrPwdEmpty,
    isMobileEmpty,
    isVcodeEmpty,
    setUsername,
    setPassword,
    setMobile,
    setVcode,
  } = loginStore
  const { setIsLogout } = globalStore


  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case `pwdLogin`:
        return (
          <PwdLogin
            isLoading={isLoading}
            username={username}
            password={password}
            isUnameOrPwdEmpty={isUnameOrPwdEmpty}
            setUsername={setUsername}
            setPassword={setPassword}
            onSumbit={onSumbit}
          />
        )
      case `vcodeLogin`:
        return (
          <VcodeLogin
            isLoading={isLoading}
            mobile={mobile}
            vcode={vcode}
            mobileOrVcodeIsEmpty={isMobileEmpty || isVcodeEmpty}
            setMobile={setMobile}
            setVcode={setVcode}
            onSumbit={onSumbit}
          />
        )
      default:
        return (
          <PwdLogin
            isLoading={isLoading}
            username={username}
            password={password}
            isUnameOrPwdEmpty={isUnameOrPwdEmpty}
            setUsername={setUsername}
            setPassword={setPassword}
            onSumbit={onSumbit}
          />
        )
    }
  }

  return (
    <TabView
      routes={routes}
      renderScene={renderScene}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})