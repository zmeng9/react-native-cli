import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { ColorfulText } from './ColorfulText'
import { Btn } from './Btn'
import { IPress } from './common'

export interface INoDataProps extends IPress {
  text?: string
  btnText?: string
}

export const NoData: React.SFC<INoDataProps> = observer(({
  text = `暂无数据`,
  btnText,
  onPress,
}) => {
  return (
    <View style={styles.root}>
      <ColorfulText color='secondary' text={text} fontSize={18} textAlign='center' />
      {btnText && (
        <Btn
          text={btnText}
          color='primary'
          onPress={onPress}
          size='large'
          style={{ width: 150, marginTop: 20 }}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: `center`,
    alignContent: `center`,
  },
})