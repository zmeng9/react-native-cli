import { useActionSheet } from '@expo/react-native-action-sheet'
import { useVibration } from './vibration'


/* 
 * bottom action sheet hook
 */

export const useSheet = () => {
  const { showActionSheetWithOptions } = useActionSheet()
  const { vibrate } = useVibration()

  const showSheet = (options: Array<string>, cb: (idx: number) => void, isVibrate?: boolean) => {
    if (isVibrate)
      vibrate()

    showActionSheetWithOptions({
      options: [...options, `取消`],
      cancelButtonIndex: 2,
    }, cb)
  }

  return {
    showSheet,
  }
}