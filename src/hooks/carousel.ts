import { useEffect } from 'react'
import { useService, IService } from './service'


/* 
 * get carousels hook
 */


export const useCarousels = ({
  store, 
  ...serviceProps
}: IService) => {
  const { result } = useService({
    store,
    ...serviceProps,
  })

  const { setCarousels } = store

  useEffect(() => {
    if (result && result.data) {
      const { rows = [] } = result.data

      setCarousels(rows)
    }
  }, [result])

  return result
}