import React from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useStores, usePlatform } from '@/hooks'
import { ScrollView } from './ScrollView'
import { IStyle, IChildren } from './common'


export interface IKeyboardAvoidingScrollViewProps extends IStyle, IChildren {
  contentContainerStyle?: IStyle['style']
}

export const KeyboardAvoidingScrollView: React.SFC<IKeyboardAvoidingScrollViewProps> = observer(({
  style,
  contentContainerStyle,
  children,
}) => {
  const { isIos } = usePlatform()
  const { globalStore } = useStores()
  const { headerHeight } = globalStore


  return (
    <KeyboardAvoidingView
      style={[styles.root, style]}
      keyboardVerticalOffset={headerHeight}
      behavior={isIos ? `padding` : undefined}
    >
      <ScrollView style={[styles.container, contentContainerStyle]} >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingVertical: 10,
  },
})