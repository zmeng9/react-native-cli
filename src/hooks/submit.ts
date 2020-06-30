import { useCallback } from 'react'
import { Keyboard } from 'react-native'


/* 
 * sumbit hook
 */


export const useSumbit = (store: any) => {
  const { setIsSubmit } = store

  const onSumbit = useCallback(() => {
    Keyboard.dismiss()
    setIsSubmit(true)
  }, [])

  return {
    onSumbit,
  }
}