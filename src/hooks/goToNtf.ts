import { useEffect } from 'react'
import { useStores } from './stores'
import { useIsFirstRender } from './isFirstRender'
import { goToNotification, isEmptyStr } from '@/utils'


export const useGoToNtf = () => {
  const { notificationStore } = useStores()
  const isFirstRender = useIsFirstRender()

  const { payAmount } = notificationStore

  useEffect(() => {
    if (!isEmptyStr(payAmount) && !isFirstRender)
      goToNotification()
  }, [payAmount])
}