import { types } from 'mobx-state-tree'
import { isEmptyStr } from '@/utils'


export const Vcode = () => {
  return types
    .model({
      mobile: ``,
      vcode: ``,
    })
    .views(self => ({
      get isMobileEmpty() {
        return isEmptyStr(self.mobile)
      },
      get isVcodeEmpty() {
        return isEmptyStr(self.vcode)
      },
    }))
    .actions(self => ({
      setMobile(mobile: string) {
        self.mobile = mobile
      },
      setVcode(vcode: string) {
        self.vcode = vcode
      },
    }))
}