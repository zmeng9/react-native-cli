import { createRef } from 'react'
import { StackActions, PartialState, NavigationState } from '@react-navigation/native'


/* 
 * Created the global navigation
*/

export const isMountedRef: any = createRef()
export const navigationRef: any = createRef()

export type IResetState = PartialState<NavigationState>

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
  reset(state: IResetState) {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.reset(state)
  },
  replace(obj?: Object) {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.replace(obj)
  },
  popToTop() {
    if (isMountedRef.current && navigationRef.current)
      navigationRef.current.dispatch(StackActions.popToTop())
  }
}

export const goBack = () => {
  navigation.goBack()
}

export const goToHome = () => {
  navigation.navigate(`Home`)
}

export const resetTo = (state: IResetState) => {
  navigation.reset(state)
}

export const goToHomeLater = () => {
  setTimeout(() => {
    goToHome()
  }, 300)
}

export const goToRecommendLater = () => {
  setTimeout(() => {
    goToRecommend()
  }, 300)
}

export const goToCardPackageLater = () => {
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: `CardPackage` }],
    })
  }, 300)
}

export const goToRecommend = () => {
  navigation.navigate(`Recommend`)
}

export const goToProperty = () => {
  navigation.navigate(`Property`)
}

export const goToPropertyDetail = () => {
  navigation.navigate(`PropertyDetail`)
}

export const goToCurrencyList = (value: number) => {
  navigation.navigate(`CurrencyList`, { value })
}

export const goToRecharge = () => {
  navigation.navigate(`Recharge`)
}

export const goToWithdraw = () => {
  navigation.navigate(`Withdraw`)
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

export const goToTransferUsername = () => {
  navigation.navigate(`TransferUsername`)
}

export const goToTransferConfirm = () => {
  navigation.navigate(`TransferConfirm`)
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

export const goToCardPackage = () => {
  navigation.navigate(`CardPackage`)
}

export const goToCardSelect = () => {
  navigation.navigate(`CardSelect`)
}

export const goToBankCardForm = () => {
  navigation.navigate(`BankCardForm`)
}

export const goToBankCardConfirm = () => {
  navigation.navigate(`BankCardConfirm`)
}

export const goToSupplementCardForm = () => {
  navigation.navigate(`SupplementCardForm`)
}

export const goToLogin = () => {
  navigation.navigate(`Login`)
}

export const goToReg = () => {
  navigation.navigate(`Reg`)
}

export const goToRnameAuth = () => {
  navigation.navigate(`RnameAuth`)
}

export const goToSetting = () => {
  navigation.navigate(`Setting`)
}

export const goToUserInfo = () => {
  navigation.navigate(`UserInfo`)
}

export const goToSearch = () => {
  navigation.navigate(`Search`)
}

export const goToNotification = () => {
  navigation.navigate(`Notification`)
}