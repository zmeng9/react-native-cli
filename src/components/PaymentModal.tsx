import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { PasswordModal } from 'react-native-pay-password'
import { useWindowSize, useSafeArea } from '@/hooks'


const { width } = useWindowSize()

export interface IPaymentModalProps {
  tip?: string
  passwordModalRef: any
  onDone: (value: string) => void
}

export const PaymentModal: React.SFC<IPaymentModalProps> = observer(({
  tip,
  passwordModalRef,
  onDone,
}) => {
  const insets = useSafeArea()

  return (
    <PasswordModal
      backdrop
      ref={(ref: any) => passwordModalRef.current = ref}
      onDone={onDone}
      title='请输入支付密码'
      tip={tip}
      inputViewProps={{
        style: {
          borderRadius: 12,
          height: (width - 88) / 6,
          width: width - 88,
        },
        itemStyle: {
          height: (width - 88) / 6,
          flex: 1,
        },
      }}
      keyboardProps={{
        style: {
          paddingBottom: insets.bottom,
        },
      }}
    />
  )
}, { forwardRef: true })

const styles = StyleSheet.create({
  root: {
  },
})