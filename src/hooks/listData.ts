import { useEffect } from 'react'
import { useService, IService } from './service'


/* 
 * list data hook
 */


export const useListData = ({
  store,
  service,
}: IService) => {
  const data = useService({
    store,
    service,
  })

  const {
    offset,
    replaceListData,
    bulkAddToListData,
    setTotalCount,
  } = store

  useEffect(() => {
    if (data) {
      const { rows = [], count = 0 } = data

      if (offset === 0)
        replaceListData(rows)
      else
        bulkAddToListData(rows)

      setTotalCount(count)
    }
  }, [data])

  return data
}