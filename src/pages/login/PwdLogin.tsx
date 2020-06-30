import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { KeyboardAvoidingScrollView, Input, Btn, ColorfulText } from '@/components'
import { useWindowSize } from '@/hooks'
import { goToReg } from '@/utils'


const { height } = useWindowSize()

export interface IPwdLoginProps {
  isLoading: boolean
  username: string
  password: string
  isUnameOrPwdEmpty: boolean
  setUsername: (text: string) => void
  setPassword: (text: string) => void
  onSumbit: () => void
}

export const PwdLogin: React.SFC<IPwdLoginProps> = observer(({
  isLoading,
  username,
  password,
  isUnameOrPwdEmpty,
  setUsername,
  setPassword,
  onSumbit,
}) => {
  return (
    <KeyboardAvoidingScrollView style={styles.root}>
      <View style={{ marginTop:  height / 4 }}>
        <Input
          placeholder='账号'
          maxLength={18}
          value={username}
          autoCompleteType='username'
          onChangeText={setUsername}
          clearButtonMode='while-editing'
        />
        <Input
          secureTextEntry
          maxLength={16}
          placeholder='密码'
          value={password}
          onChangeText={setPassword}
        />
        <Btn
          fullWidth
          text='登陆'
          color='primary'
          size='large'
          disabled={isUnameOrPwdEmpty || isLoading}
          isLoading={isLoading}
          onPress={onSumbit}
        />
        <ColorfulText
          text='去注册'
          color='primary'
          fontSize={18}
          textAlign='center'
          onPress={goToReg}
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