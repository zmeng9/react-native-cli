import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Icon, ColorfulText } from '@/components'
import { useStores } from '@/hooks'


export interface IHeaderLeftProps {

}

export const HeaderLeft: React.FC<IHeaderLeftProps> = observer(({

}) => {
  const { globalStore } = useStores()
  const { location } = globalStore

  return (
    <View style={styles.root}>
      <ColorfulText
        fontSize={16}
        text={location ? `${location.city}${location.district}` : `正在定位`}
        style={{ marginLeft: 10, marginRight: 0 }}
      />
      <Icon name='ios-arrow-down' size={16} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
  },
})