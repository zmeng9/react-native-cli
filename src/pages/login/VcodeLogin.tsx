import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { KeyboardAvoidingScrollView, Input, VCodeInput, Btn, ColorfulText } from '@/components'
import { useWindowSize } from '@/hooks'
import { goToReg } from '@/utils'


const { height } = useWindowSize()

export interface IVcodeLoginProps {
  isLoading: boolean
  mobile: string
  vcode: string
  mobileOrVcodeIsEmpty: boolean
  setMobile: (text: string) => void
  setVcode: (text: string) => void
  onSumbit: () => void
}

export const VcodeLogin: React.SFC<IVcodeLoginProps> = observer(({
  isLoading,
  mobile,
  vcode,
  mobileOrVcodeIsEmpty,
  setMobile,
  setVcode,
  onSumbit,
}) => {
  return (
    <KeyboardAvoidingScrollView style={styles.root}>
      <View style={{ marginTop:  height / 4 }}>
        <Input
          placeholder='手机号'
          autoCompleteType='tel'
          maxLength={18}
          value={mobile}
          onChangeText={setMobile}
          clearButtonMode='while-editing'
        />
        <VCodeInput
          mobile={mobile}
          value={vcode}
          onChangeText={setVcode}
        />
        <Btn
          fullWidth
          text='登陆'
          color='primary'
          size='large'
          disabled={mobileOrVcodeIsEmpty || isLoading}
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