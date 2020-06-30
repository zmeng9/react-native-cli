import { useStores } from './stores'


/* 
 * wallet status hook
 */


export const useWalletStatus = () => {
  const { globalStore } = useStores()
  const { walletStatus, setWalletStatus } = globalStore


  const setWalletStatusToNormal = () => {
    setWalletStatus(`Normal`)
  }

  const setWalletStatusToNotInit = () => {
    setWalletStatus(`NotInit`)
  }

  const setWalletStatusToNotLogin = () => {
    setWalletStatus(`NotLogin`)
  }

  const setWalletStatusToNotRegister = () => {
    setWalletStatus(`NotRegister`)
  }

  const isWalletStatusNormal = (() => {
    return walletStatus === `Normal`
  })()

  const isWalletStatusNotInit = (() => {
    return walletStatus === `NotInit`
  })()

  const isWalletStatusNotLogin = (() => {
    return walletStatus === `NotLogin`
  })()

  const isWalletStatusNotRegister = (() => {
    return walletStatus === `NotRegister`
  })()

  return {
    setWalletStatusToNormal,
    setWalletStatusToNotInit,
    setWalletStatusToNotLogin,
    setWalletStatusToNotRegister,
    isWalletStatusNormal,
    isWalletStatusNotInit,
    isWalletStatusNotLogin,
    isWalletStatusNotRegister,
  }
}