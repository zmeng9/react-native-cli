import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Card, Icon, ColorfulText, Avatar } from '@/components'
import { goToUserInfo, goToLogin } from '@/utils'


export interface IUserInfoProps {
  authToken: string | null
  userInfo: any
}

export const UserInfo: React.SFC<IUserInfoProps> = observer(({
  authToken,
  userInfo,
}) => {
  const { avatar, username, mobile } = userInfo
  const isHasMobile = mobile ? `hasMobile` : `notHasMobile`

  return (
    <Card onPress={authToken ? goToUserInfo : goToLogin}>
      <View style={styles.root}>
        <View style={styles.container}>
          <Avatar size='large' uri={avatar} style={{ marginTop: mobile ? 6 : 0 }} />
          <View>
            <View style={styles[isHasMobile]}>
              <ColorfulText
                text={authToken ? username : `去登陆`}
                color='secondary'
                style={{ marginVertical: 3 }}
                fontSize={15}
              />
            </View>
            {!!mobile && (
              <ColorfulText
                text={`手机: ${mobile}`}
                color='secondary'
                style={{ marginVertical: 3 }}
                fontSize={15}
              />
            )}
          </View>
        </View>
        <Icon name='ios-arrow-forward' size={24} />
      </View>
    </Card>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginVertical: 10,
  },
  container: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  notLogin: {
    justifyContent: `center`,
    alignItems: `center`,
    paddingVertical: 15,
  },
  hasMobile: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  notHasMobile: {

  },
})