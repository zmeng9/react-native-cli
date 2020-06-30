import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnModal from 'react-native-modal'
import { ScrollView } from './ScrollView'
import { Card } from './Card'
import { ColorfulText } from './ColorfulText'
import { Icon } from './Icon'
import { IChildren, IStyle } from './common'


export interface IModalProps extends IChildren, IStyle {
  isVisible: boolean
  title?: string
  onCancel: () => void
}

export const Modal: React.SFC<IModalProps> = observer(({
  style,
  children,
  isVisible,
  title,
  onCancel,
}) => {
  const renderCardHeader = () => (
    <>
      {title && <ColorfulText text={title} bold fontSize={18} />}
      <Icon name='ios-close' onPress={onCancel} size={30} />
    </>
  )

  return (
    <RnModal
      avoidKeyboard
      isVisible={isVisible}
      animationIn='fadeInUp'
      animationOut='fadeOutDown'
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
      swipeDirection={[`down`]}
      propagateSwipe={true}
      useNativeDriver={true}
      style={[styles.root, style]}
    >
      <Card cardHeader={renderCardHeader()} style={styles.card}>
        <ScrollView>
          {children}
        </ScrollView>
      </Card>
    </RnModal>
  )
})

const styles = StyleSheet.create({
  root: {
    margin: 0,
    justifyContent: `flex-end`
  },
  card: {
    margin: 0,
    borderRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  }
})