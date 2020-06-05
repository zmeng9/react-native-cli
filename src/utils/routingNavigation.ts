import { createRef } from 'react'


/* 
 * Created the global navigation
*/

export const isMountedRef: any = createRef()
export const navigationRef: any = createRef()

export const navigation = {
  navigate(name: string, params?: any) {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.navigate(name, params)
  },
  goBack() {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.goBack()
  },
  setParams(obj: Object) {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.setParams(obj)
  },
}

export const goBack = () => {
  navigation.goBack()
}

export const goToRecommend = () => {
  navigation.navigate(`Recommend`)
}

export const goToSearch = () => {
  navigation.navigate(`Search`)
}

export const goToNotification = () => {
  navigation.navigate(`Notification`)
}

export const goToGatherCode = () => {
  navigation.navigate(`GatherCode`)
}

export const goToGatherAmount = () => {
  navigation.navigate(`GatherAmount`)
}

export const goToGatherDetails = () => {
  navigation.navigate(`GatherDetails`)
}

export const goToScanner = () => {
  navigation.navigate(`Scanner`)
}

export const goToScannerPayment = () => {
  navigation.navigate(`ScannerPayment`)
}

export const goToTransferAccount = () => {
  navigation.navigate(`TransferAccount`)
}

export const goToTransferConfirm = (account: string) => {
  navigation.navigate(`TransferConfirm`, { account })
}

export const goToTransferRecord = () => {
  navigation.navigate(`TransferRecord`)
}

export const goToTransferDetail = () => {
  navigation.navigate(`TransferDetail`)
}

export const goToNfc = () => {
  navigation.navigate(`Nfc`)
}

export const goToNfcGather = () => {
  navigation.navigate(`NfcGather`)
}

export const goToNfcPayment = () => {
  navigation.navigate(`NfcPayment`)
}

export const goToLogin = () => {
  navigation.navigate(`Login`)
}

export const goToReg = () => {
  navigation.navigate(`Reg`)
}

export const goToSetting = () => {
  navigation.navigate(`Setting`)
}

export const goToUserInfo = () => {
  navigation.navigate(`UserInfo`)
}