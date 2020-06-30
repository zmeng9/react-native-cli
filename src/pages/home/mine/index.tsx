import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Navigator, Screen, Icon } from '@/components'
import { goToSetting } from '@/utils'
import { Mine } from './mine'
import { Setting } from './setting'
import { UserInfo } from './userInfo'


export const MineNavigator: React.SFC = observer(() => {
  return (
    <Navigator>
      <Screen
        name='Mine'
        component={Mine}
        options={{
          headerTitle: `我的`,
          headerRight: () => (
            <View style={{ flexDirection: `row`, alignItems: `center` }}>
              <Icon name='ios-text' onPress={goToSetting} style={{ paddingHorizontal: 5 }} />
              <Icon name='ios-cog' onPress={goToSetting} />
            </View>
          ),
        }}
      />
      <Screen
        name='Setting'
        component={Setting}
        options={{
          headerTitle: `设置`
        }}
      />
      <Screen
        name='UserInfo'
        component={UserInfo}
        options={{
          headerTitle: `个人信息`
        }}
      />
    </Navigator>
  )
})