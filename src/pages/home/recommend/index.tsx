import React from 'react'
import { Navigator, Screen, Icon } from '@/components'
import { Recommend } from './recommend'
import { goToSearch } from '@/utils'
import { HeaderLeft } from './recommend/HeaderLeft'


export const RecommendNavigator: React.SFC = () => {
  return (
    <Navigator>
      <Screen
        name='Recommend'
        component={Recommend}
        options={{
          headerLeft: () => <HeaderLeft />,
          headerTitle: `首页`,
          headerRight: () => <Icon name='ios-search' onPress={goToSearch} />,
        }}
      />
    </Navigator>
  )
}