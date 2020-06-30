import { useState, useEffect } from 'react'
import { useIsFirstRender } from './isFirstRender'
import { useToast } from './toast'


/* 
 * Service hook
 */

export interface IService {
  store: any
  service: () => Promise<any>
  isFetch?: boolean
  isSelfLoadingInitVal?: boolean
  immedate?: boolean
  setInitialResult?: boolean
  deps?: Array<any>
  beforeFetch?: () => void
}

export interface IServiceResult {
  code: 0 | 1
  msg: string | null
  data: any
  error: any
}


export interface IServiceReturnType {
  isSelfLoading: boolean
  result: IServiceResult | null
}

export const useService = ({
  store,
  service,
  isFetch = true,
  isSelfLoadingInitVal = true,
  immedate = true,
  setInitialResult = false,
  deps = [],
  beforeFetch,
}: IService): IServiceReturnType => {
  const toast = useToast()
  const isFirstRender = useIsFirstRender()
  const [isSelfLoading, setIsSelfLoading] = useState(isSelfLoadingInitVal)
  const [result, setResult] = useState(null)
  const { setIsLoading, setError, setIsSubmit } = store

  const isForm = typeof setIsSubmit === `function`

  const fetchData = async () => {
    setIsLoading(true)
    setIsSelfLoading(true)

    try {
      const result = await service()

      if (result) {
        const { code, message, error } = result.data

        setResult(result.data)

        if (!code) {
          if (store.error)
            setError(null)
        } else if (code && !error) {
          toast(message)
        }

        setIsLoading(false)
        setIsSelfLoading(false)
      } else {
        toast(`内部服务器错误`)
      }
    } catch (error) {
      setError(error.message)

      switch (error.message) {
        case `Network Error`:
          return toast(`连接失败，请检查你的网络设置`)
        default:
          return toast(`发生意外性错误`)
      }
    } finally {
      if (isForm) {
        setIsLoading(false)
        setIsSelfLoading(false)
        setIsSubmit(false)
      }
    }
  }

  useEffect(() => {
    if (setInitialResult)
      setResult(null)

    if (immedate || !isFirstRender) {

      // Do something before 
      if (beforeFetch)
        beforeFetch()

      if (isFetch)
        fetchData()
    }

    return () => {
      setResult(null)
    }
  }, deps)

  return {
    isSelfLoading,
    result,
  }
}