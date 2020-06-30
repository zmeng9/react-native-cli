import { useEffect } from 'react'
import { useStores } from './stores'
import { useIsFirstRender } from './isFirstRender'


export const useLoading = (store: any) => {
  const isFirstRender = useIsFirstRender()
  const { globalStore } = useStores()
  const { setIsLoading } = store
  const { isLoading } = globalStore

  useEffect(() => {
    if (!isFirstRender)
      setIsLoading(isLoading)
  }, [isLoading])
}