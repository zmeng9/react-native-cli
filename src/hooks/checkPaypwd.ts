import { checkPaypwd } from '@/services'
import { useService } from './service'
import { useEffect } from './effect'


/* 
 * check pay password hook
 */

export interface ICheckPaypwd {
  store: any
  onSuccess: () => void
}

export const useCheckPaypwd = ({
  store,
  onSuccess,
}: ICheckPaypwd) => {
  const { paypwd } = store

  const data = useService({
    store,
    service: checkPaypwd,
    params: [paypwd],
    deps: [paypwd],
    immedate: false,
    isFetch: paypwd.length === 6,
  })

  useEffect(() => {
    if (data) {
      const { sign } = data
      if (sign)
        onSuccess()
    }
  }, [data])
}