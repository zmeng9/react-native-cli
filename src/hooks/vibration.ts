import { Vibration } from 'react-native'
import { usePlatform } from './platform'


/* 
 * Vibration hook
 * 1. android pattern args ( 1, 4:  waittime, 2: vibration length, 3: duration to wait before next vibration )
 * 2. ios pattern args ( 1:  waittime, 2, 3, 4: duration to wait before next vibration )
 */


export const useVibration = () => {
  const { isAndroid } = usePlatform()

  const vibrate = (timeLength: number = 100) => {
    const pattern = isAndroid ? [0, timeLength] : [0]
    Vibration.vibrate(pattern)
  }

  const longVibrate = () => {
    const pattern = isAndroid ? [0, 100] : [0]
    Vibration.vibrate(pattern, true)
  }

  return {
    vibrate,
    longVibrate,
    cancelVibrate: Vibration.cancel,
  }
}