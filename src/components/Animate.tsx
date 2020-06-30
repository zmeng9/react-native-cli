import React, { useRef } from 'react'
import { StyleSheet, Animated } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useFocusEffect } from '@/hooks'
import { IChildren } from './common'


/* 
 * Fade
 */


export interface IFadeProps extends IChildren {
  isFade: boolean | null
}

export interface ISlideProps extends IChildren {
  distance: number
  duration?: number
  isSlide: boolean | null
}

export const Fade: React.SFC<IFadeProps> = observer(({
  children,
  isFade,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start()
  }

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start()
  }

  useFocusEffect(() => {
    if (isFade === null)
      return
    else if (isFade)
      fadeIn()
    else
      fadeOut()
  }, [isFade])

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  )
})


/* 
 * Slide
*/


export const Slide: React.SFC<ISlideProps> = observer(({
  children,
  isSlide,
  distance = 0,
  duration = 300,
}) => {
  const slideAnim = useRef(new Animated.Value(distance)).current

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start()
  }

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: distance,
      duration,
      useNativeDriver: true,
    }).start()
  }

  useFocusEffect(() => {
    if (isSlide === null)
      return
    else if (isSlide)
      slideIn()
    else
      slideOut()
  }, [isSlide])

  return (
    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
      {children}
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})