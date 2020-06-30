import { useEffect } from 'react'
import { onResult, get } from '@/utils'
import { useStores } from './stores'


export const useLibwalletResult = (
  cmd: string | false,
  onSuccess: (data: any, cmd: string) => void,
  onError?: (code: string, cmd: string) => void,
  onFinally?: () => void,
) => {
  const { globalStore } = useStores()
  const { libwalletResult } = globalStore

  useEffect(() => {
    onResult(libwalletResult, cmd, onSuccess, onError, onFinally)
  }, [libwalletResult])
}

export const useTransponderResult = (
  cmd: string | false,
  onSuccess: (data: any, cmd: string) => void,
) => {
  const { globalStore } = useStores()
  const { transponderResult } = globalStore

  useEffect(() => {
    onResult(transponderResult, cmd, onSuccess)
  }, [transponderResult])
}

export const useResult = (
  store: any,
  cmd: string | false,
  onSuccess?: (data: any, cmd: string) => void,
) => {
  const { globalStore } = useStores()

  const { libwalletResult } = globalStore
  const { setResult } = store

  const code = get(libwalletResult, `data.code`, ``)
  const data = get(libwalletResult, `data.resp_data`, null)
  
  useLibwalletResult(cmd, onSuccess || (() => {
    setResult({
      code,
      data,
    })
  }))
}