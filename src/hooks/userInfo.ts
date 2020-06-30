import { useEffect } from 'react'
import { getUserInfo } from '@/services'
import { useStores } from './stores'
import { useService } from './service'


/* 
 * Use get and set userinfo hook 
 */

export const useUserInfo = (): {
  isSelfLoading: boolean
} => {
  const { globalStore } = useStores()
  const { setUserInfo } = globalStore

  const { isSelfLoading, result } = useService({
    store: globalStore,
    service: getUserInfo,
  })

  useEffect(() => {
    if (result && result.data)
      setUserInfo(result.data)
  }, [result])

  return {
    isSelfLoading,
  }
}