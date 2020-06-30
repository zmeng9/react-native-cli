import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import LottieView, { AnimatedLottieViewProps } from 'lottie-react-native'
import { useWindowSize } from '@/hooks'


const { width } = useWindowSize()

export interface ILottieProps extends AnimatedLottieViewProps {
}

export const Lottie: React.SFC<ILottieProps> = observer(({
  style,
  ...lottieViewProps
}) => {
  return (
    <LottieView
      hardwareAccelerationAndroid
      resizeMode='cover'
      style={[styles.root, style]}
      {...lottieViewProps}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    width,
  },
})