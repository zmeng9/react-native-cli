import { types } from 'mobx-state-tree'


export const SecureText = () => {
  return types
    .model({
      isShowSecureText: false,
    })
    .actions(self => ({
      switchIsShowSecureText() {
        self.isShowSecureText = !self.isShowSecureText
      },
    }))
}