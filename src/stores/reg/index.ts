import { types } from 'mobx-state-tree'
import { min, validLtNumUdl, isEmptyStr } from '@/utils'
import { Service, Form, SecureText } from '../common'


export const Reg = types.compose(
  Service(false),
  Form(),
  SecureText(),
  types
    .model({
      username: ``,
      password: ``,
    })
    .views(self => ({
      get isUnameOrPwdEmpty() {
        return isEmptyStr(self.username) || isEmptyStr(self.password)
      },
      get validUsernameLen() {
        return min(self.username, 6)
      },
      get validPwdLen() {
        return min(self.password, 6)
      },
      get validPwd() {
        return validLtNumUdl(self.password)
      },
    }))
    .actions(self => ({
      setUsername(username: string) {
        self.username = username
      },
      setPassword(password: string) {
        self.password = password
      },
    }))
)