import { types } from 'mobx-state-tree'
import { Service } from '../common'


/* 
 * User status
 */

const Location = types.model({
  city: types.string,
  district: types.string,
})


export const UserInfo = types.model({
  username: types.string,
  nickname: types.string,
  mobile: types.string,
  avatar: types.string,
})

export const Global = types.compose(
  Service(false),
  types
    .model({
      isLogout: false,
      headerHeight: 0,
      location: types.maybeNull(Location),
      authToken: types.maybeNull(types.string),
      userInfo: types.optional(UserInfo, {
        username: ``,
        nickname: ``,
        mobile: ``,
        avatar: ``,
      }),
    })
    .actions(self => ({
      setIsLogout(isLogout: boolean) {
        self.isLogout = isLogout
      },
      setHeaderHeight(headerHeight: number) {
        self.headerHeight = headerHeight
      },
      setLocation(location: any) {
        self.location = location
      },
      setAuthToken(authToken: any) {
        self.authToken = authToken
      },
      setUserInfo(userInfo: any) {
        self.userInfo = userInfo
      },
    })))