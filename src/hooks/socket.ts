import { useEffect } from 'react'
import { useStores } from '@/hooks'
import { logger, eq, get, isTXCmd } from '@/utils'
import { pingCmd, pongCmd, transactRecvCmd, triggerUnsettleTransactionCmd } from '@/services'
import { useIsFirstRender } from './isFirstRender'
import { useToast } from './toast'
import { useError } from './error'


/* 
 * socket hook
 */


export interface ISocket {
  socketType?: `libwallet` | `transponder`
  store: any
  params?: {
    command: string
    req_data?: any
  }
  deps?: Array<any>
  delay?: number
  isFetch?: boolean
  isListen?: boolean
  immedate?: boolean
  beforeFetch?: () => void
}

export interface ISocketResult {
  command: string
  data: {
    code: string
    resp_data?: any
  }
}

export const useSocket = ({
  socketType = `libwallet`,
  store,
  params,
  deps = [],
  delay = 0,
  isFetch = true,
  isListen = false,
  immedate = true,
  beforeFetch,
}: ISocket) => {
  const toast = useToast()
  const isFirstRender = useIsFirstRender()
  const { globalStore } = useStores()
  const { onError } = useError()
  const {
    isConnLibwalletSocket,
    isConnTransponderSocket,
    openIsLoading,
    closeIsLoading,
    setLibwalletResult,
    setTransponderResult,
  } = globalStore
  const { setError, setIsSubmit } = store

  const isForm = typeof setIsSubmit === `function`

  let socket: any
  let isConnSocket: boolean

  switch (socketType) {
    case `libwallet`:
      socket = global.libwalletSocket
      isConnSocket = isConnLibwalletSocket
      break
    case `transponder`:
      socket = global.transponderSocket
      isConnSocket = isConnTransponderSocket
      break
  }

  const fetchData = () => {
    if (params) {
      if (!(isTXCmd(params) ||
        eq(params.command, pingCmd) ||
        eq(params.command, pongCmd) ||
        eq(params.command, transactRecvCmd) ||
        eq(params.command, triggerUnsettleTransactionCmd)
      ))
        openIsLoading()

      const paramsStr = JSON.stringify(params)

      socket.send(paramsStr)

      logger.info(`<-- ${socketType} - ${params.command} ReqData:`, params)
    }
  }

  const listenData = () => {
    socket.onmessage = (e: any) => {
      const resp = JSON.parse(e.data)

      if (resp) {
        const code = get(resp, `data.code`, null)
        const resp_data = get(resp, `data.resp_data`, null)

        switch (socketType) {
          case `libwallet`:
            setLibwalletResult(resp)
            break
          case `transponder`:
            setTransponderResult(resp)
            break
        }

        if (!code) {
          logger.success(`--> ${socketType} - ${resp.command} TXRespData:`, resp.data)
        } else if (code === `Ok`) {
          if (store.error)
            setError(null)

          logger.success(`--> ${socketType} - ${resp.command} RespData:`, resp_data)
        } else {
          onError(code)
          logger.error(`--> ${socketType} - ${resp.command} Client fail:`, resp)
        }

        closeIsLoading()
      } else {
        logger.error(`--> ${socketType} - ${resp.command} Server error`, resp)
        toast(`内部服务器错误`)
      }
    }

    socket.onerror = (error: any) => {
      logger.error(`--> ${socketType} Server error`, error.message)

      setError(error.message)

      switch (error.message) {
        case `Network Error`:
          toast(`网络异常，请检查你的网络设置`)
          break
        default:
          toast(`发生意外性错误`)
          break
      }
    }
  }

  useEffect(() => {
    if (isConnSocket) {
      if (immedate || !isFirstRender) {
        // Do something before fetch
        if (beforeFetch)
          beforeFetch()

        if (isFetch)
          setTimeout(() => fetchData(), delay)

        if (isListen)
          listenData()

        if (isForm) {
          closeIsLoading()
          setIsSubmit(false)
        }
      }
    }
  }, [isConnSocket, ...deps])
}

