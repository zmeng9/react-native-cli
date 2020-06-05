import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useTheme, useStores, useWindowSize } from '@/hooks'
import { Icon } from './Icon'
import { goBack } from '@/utils'
import { IChildren } from './common'

export interface IHeaderProps extends IChildren {
  type?: `header` | `footer`
  isEmpty?: boolean
}

const { width } = useWindowSize()

export const Header: React.SFC<IHeaderProps> = observer(({
  children,
  type = `header`,
  isEmpty = false,
}) => {
  const insets = useSafeArea()
  const { paper, divider } = useTheme()
  const { globalStore: { headerHeight } } = useStores()
  const isHeader = type === `header`
  const isFooter = type === `footer`

  return (
    <View style={[
      styles.root,
      {
        height: headerHeight,
        paddingTop: isHeader ? insets.top : 0,
        paddingBottom: isFooter ? insets.bottom : 0,
        paddingHorizontal: isFooter ? 10 : 0,
        borderBottomWidth: isHeader ? 0.5 : 0,
        borderTopWidth: isFooter ? 0.5 : 0,
        backgroundColor: paper,
        borderBottomColor: divider,
        borderTopColor: divider,
      }
    ]}>
      {(isHeader && !isEmpty) && <Icon name='ios-arrow-back' onPress={goBack} size={32} />}
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width,
    flexDirection: 'row',
    justifyContent: `space-between`,
    alignItems: `center`,
  },
})