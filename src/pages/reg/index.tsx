import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores, useSumbit, useWindowSize, useToast } from '@/hooks'
import { KeyboardAvoidingScrollView, Input, Btn, ColorfulText } from '@/components'
import { goToLogin } from '@/utils'


const { height } = useWindowSize()

export const Reg: React.FC = observer(() => {
  const toast = useToast()
  const { regStore } = useStores()
  const { onSumbit } = useSumbit(regStore)


  const {
    isLoading,
    isSubmit,
    username,
    password,
    isShowSecureText,
    isUnameOrPwdEmpty,
    validPwdLen,
    setUsername,
    setPassword,
    switchIsShowSecureText,
  } = regStore



  return (
    <KeyboardAvoidingScrollView style={styles.root}>
      <View style={{ marginTop: height / 4 }}>
        <Input
          placeholder='用户米'
          maxLength={18}
          value={username}
          onChangeText={setUsername}
          clearButtonMode='while-editing'
        />
        <Input
          secureTextEntry={!isShowSecureText}
          placeholder='密码'
          maxLength={16}
          value={password}
          rightIconName={`ios-eye${isShowSecureText ? `` : `-off`}`}
          onChangeText={setPassword}
          onPressRightIcon={switchIsShowSecureText}
        />
        <Btn
          fullWidth
          text='下一步'
          color='primary'
          size='large'
          disabled={isUnameOrPwdEmpty || isLoading}
          isLoading={isLoading}
          onPress={onSumbit}
        />
        <ColorfulText
          text='已有账号，去登录'
          color='primary'
          fontSize={18}
          textAlign='center'
          onPress={goToLogin}
        />
      </View>
    </KeyboardAvoidingScrollView>
  )
})

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
})