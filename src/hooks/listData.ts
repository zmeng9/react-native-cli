import { useEffect } from 'react'
import { useService, IService } from './service'
import { useLibwalletResult } from './result'
import { useSocket, ISocket } from './socket'


/* 
 * list data hook
 */


export interface IListDataWithSocket extends ISocket {
  cmd: string
}


export const useListData = ({
  store,
  ...serviceProps
}: IService) => {
  const { result } = useService({
    store,
    ...serviceProps,
  })

  const {
    offset,
    replaceListData,
    bulkAddToListData,
    setTotalCount,
  } = store

  useEffect(() => {
    if (result && result.data) {
      const { rows = [], count = 0 } = result.data

      if (offset === 0)
        replaceListData(rows)
      else
        bulkAddToListData(rows)

      setTotalCount(count)
    }
  }, [result])

  return result
}

export const useListDataWithSocket = ({
  cmd,
  store,
  ...socketProps
}: IListDataWithSocket) => {
  useSocket({
    store,
    ...socketProps,
  })

  const {
    offset,
    replaceListData,
    bulkAddToListData,
    setTotalCount,
  } = store

  useLibwalletResult(cmd, data => {
    if (data) {
      if (offset === 0)
        replaceListData(data)
      else
        bulkAddToListData(data)

      setTotalCount(data.length)
    }
  })
}