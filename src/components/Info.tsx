import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Avatar } from './Avatar'
import { ColorfulText } from './ColorfulText'
import { Icon } from './Icon'
import { IPress } from './common'


export interface IInfoProps extends IPress {
  localPic?: boolean
  avatar: any
  topText?: string
  bottomText?: string
  isNavigator?: boolean
}

export const Info: React.SFC<IInfoProps> = observer(({
  localPic = false,
  avatar,
  topText,
  bottomText,
  isNavigator,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={!(typeof onPress === `function`)}>
      <View style={styles.root}>
        <View style={styles.container}>
          {localPic
            ? <Avatar local uri={avatar} />
            : <Avatar uri={avatar} />}
          <View style={{ marginLeft: 5 }}>
            {topText && (
              <ColorfulText
                bold
                text={topText}
                style={{ marginVertical: 0 }}
                fontSize={15}
              />
            )}
            {bottomText && (
              <ColorfulText
                text={bottomText}
                fontSize={15}
              />
            )}
          </View>
        </View>
        {isNavigator && <Icon name='ios-arrow-forward' size={24} />}
      </View>
    </TouchableWithoutFeedback>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    marginVertical: 10,
  },
  avatar: {
    borderRadius: 50,
    marginRight: 10,
  },
  container: {
    flexDirection: `row`,
    alignItems: `flex-start`,
  },
  topContainer: {
    flexDirection: `row`,
    alignItems: `center`,
  },
})