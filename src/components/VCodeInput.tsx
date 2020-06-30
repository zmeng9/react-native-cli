import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Input, IInputProps } from './Input'
import { isEmptyStr } from '@/utils'
import { Btn } from './Btn'
import { IPress } from './common'


export interface IVCodeInputProps extends IPress, IInputProps { 
  mobile: string
}

export const VCodeInput: React.FC<IVCodeInputProps> = observer(({
  mobile,
  onPress,
  ...inputProps
}) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [time, setTime] = useState(60)

  let timer: any = null

  useEffect(() => {
    if (isSubmit) {
      timer = setInterval(() => {
        setTime(prevVal => prevVal - 1)
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isSubmit])

  useEffect(() => {
    if (time <= 0) {
      setIsSubmit(false)
      clearInterval(timer)
      setTime(60)
    }
  }, [time])

  const _onPress = useCallback(() => {
    if (!onPress)
      return undefined

    setIsSubmit(true)
    return onPress
  }, [])

  const renderComponent = useCallback(() => (
    <Btn
      style={{ borderRadius: 12, minWidth: 88 }}
      text={isSubmit ? `${time}s` : `发送验证码`}
      color='primary'
      size='medium'
      disabled={isSubmit || isEmptyStr(mobile)}
      onPress={_onPress}
    />
  ), [isSubmit, time, mobile])

  return (
    <Input
      {...inputProps}
      keyboardType='numeric'
      maxLength={6}
      placeholder='请输入验证码'
      rightComponent={renderComponent()}
    />
  )
})

const styles = StyleSheet.create({
  root: {

  }
})