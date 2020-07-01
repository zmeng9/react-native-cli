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

export const goToRecommend = () => {
  navigation.navigate(`Recommend`)
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

export const goToSearch = () => {
  navigation.navigate(`Search`)
}