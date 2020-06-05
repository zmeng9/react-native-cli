import { useEffect } from 'react'
import { getUserInfo } from '@/services'
import { useStores } from './stores'
import { useService } from './service'


/* 
 * Use get and set userinfo hook 
 */

export const useGetUserInfo = () => {
  const { mineStore } = useStores()
  const { setUserInfo } =  mineStore

  const data = useService({
    store: mineStore,
    service: getUserInfo,
  })

  useEffect(() => {
    if (data)
      setUserInfo(data)
  }, [data])
}