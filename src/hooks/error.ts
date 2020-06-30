import { useToast } from './toast'
import { useStores } from './stores'


/* 
 * error hook
 */


export const useError = () => {
  const toast = useToast()

  const onError = (code: string) => {
    switch (code) {
      case `HttpReqDataSendError`:
        toast(`网络异常，请检查你的网络设置`)
        break
      case `LoginAtErrorStatus`:
        toast(`账号不存在`)
        break
      case `LoginValidFailed`:
        toast(`账号或密码错误`)
        break
      case `RegisterAtErrorStatus`:
        toast(`账号已被注册`)
        break
      case `DealPayReset`:
      case `DealPayPassiveReseted`:
        toast(`交易失败`)
        break
      case `PayBalanceNotEnough`:
        toast(`账户余额不足`)
        break
      default:
        toast(`发生意外错误`)
        break
    }
  }
  
  return {
    onError,
  }
}