import TouchID from 'react-native-touch-id'
import { useTheme } from './theme'
import { useToast } from './toast'


/* 
 * Touch id hook
 */

export interface IVerifyTouchId {
  type?: `pay` | `login` | `unbundle`
  onSuccess: () => void
  onFail: () => void
}

export const useTouchId = () => {
  const toast = useToast()
  const { info, error } = useTheme()

  const verifyTouchId = async ({
    type = `pay`,
    onSuccess,
    onFail,
  }: IVerifyTouchId) => {
    const text = (() => {
      switch (type) {
        case `pay`:
          return `支付`
        case `login`:
          return `登陆`
        case `unbundle`:
          return `解绑`
        default:
          return `支付`
      }
    })()

    const optionalConfigObject = {
      title: `${text}验证`,
      imageColor: info,
      imageErrorColor: error,
      sensorDescription: `指纹验证以${text}`,
      sensorFailedDescription: `验证错误，请重试`,
      sensorErrorDescription: `验证失败`,
      cancelText: `取消`,
      fallbackLabel: `使用密码${text}`,
      unifiedErrors: true,
      passcodeFallback: false,
    }

    const handleError = (err: any) => {
      const { code } = err

      switch (code) {
        case `AUTHENTICATION_FAILED`:
          return toast(`验证错误，请重试`)
        default:
          return onFail()
      }
    }

    try {
      const biometryType = await TouchID.isSupported()

      if (biometryType === `FaceID`) {
        try {
          await TouchID.authenticate(`请验证面部`, optionalConfigObject)
          onSuccess()
        } catch (err) {
          console.log(`FaceID err`, err)
          handleError(err)
        }
      } else {
        try {
          await TouchID.authenticate(`请验证指纹`, optionalConfigObject)
          onSuccess()
        } catch (err) {
          console.log(`TouchID err`, err)
          handleError(err)
        }
      }
    } catch (err) {
      console.log(`TouchID notSupported`, err)
      onFail()
    }
  }

  return {
    verifyTouchId,
  }
}