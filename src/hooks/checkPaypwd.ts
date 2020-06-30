import { checkPaypwd } from '@/services'
import { useService } from './service'
import { useFocusEffect } from './focusEffect'


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

  const { result } = useService({
    store,
    service: () => checkPaypwd(paypwd),
    deps: [paypwd],
    immedate: false,
    isFetch: paypwd.length === 6,
  })

  useFocusEffect(() => {
    if (result && result.data) {
      const { sign } = result.data
      if (sign)
        onSuccess()
    }
  }, [result])
}