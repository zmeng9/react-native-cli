import { types } from 'mobx-state-tree'
import { isEmptyStr } from '@/utils'
import { Service, Form, Vcode } from '../common'


export const IRoutes = types.model({
  key: types.string,
  title: types.string,
})

export const Login = types.compose(
  Service(false),
  Form(),
  Vcode(),
  types
    .model({
      username: ``,
      password: ``,
      routes: types.optional(types.array(IRoutes), [
        { key: `pwdLogin`, title: `密码登陆` },
        { key: `vcodeLogin`, title: `验证码登陆` },
      ])
    })
    .views(self => ({
      get isUnameOrPwdEmpty() {
        return isEmptyStr(self.username) || isEmptyStr(self.password)
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