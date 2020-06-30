import { Keyboard } from 'react-native'
import { useFocusEffect } from './focusEffect'


export const useDissKeyBoard = (isFocus: boolean = false) => {
  useFocusEffect(() => {
    if (isFocus)
      Keyboard.dismiss()

    else {
      return () => {
        Keyboard.dismiss()
      }
    }
  })
}


