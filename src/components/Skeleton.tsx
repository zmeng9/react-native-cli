import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'
import { useWindowSize, useTheme } from '@/hooks'
import { IStyle, IChildren } from './common'


const { width } = useWindowSize()

export interface ISkeletonProps extends IStyle, IChildren {
  isLoading: boolean
  layout?: `list` | `detail` | `simple` | Array<IStyle['style']>
  animationType?: `shiver` | `pulse`
}

export const Skeleton: React.SFC<ISkeletonProps> = observer(({
  style,
  children,
  isLoading,
  layout = `detail`,
  animationType = `shiver`,
}) => {
  const { backgroundColor, paper } = useTheme()

  const detailLayout = [
    styles.info,
    styles.fullWidthItem,
    styles.longItem,
    styles.shortItem,
    styles.shortItem,
    styles.shortItem,
  ]

  const _layout = (() => {
    switch (layout) {
      case `list`:
        return Array(5).fill(styles.card)
      case `detail`:
        return detailLayout
      case `simple`:
        return [
          styles.fullWidthItem,
          styles.card,
          styles.card,
        ]
      default:
        return detailLayout
    }
  })()

  return (
    <SkeletonContent
      containerStyle={[styles.root, style]}
      isLoading={isLoading}
      boneColor={paper}
      animationType={animationType}
      highlightColor={backgroundColor}
      layout={Array.isArray(layout) ? layout : _layout}
    >
      {children}
    </SkeletonContent>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  info: {
    width: width - 10,
    height: 150,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  card: {
    width: width - 10,
    height: 88,
    margin: 5,
    borderRadius: 12,
  },
  fullWidthItem: {
    width: width - 10,
    height: 35,
    margin: 5,
    borderRadius: 12,
  },
  longItem: {
    width: width - 60,
    height: 30,
    margin: 5,
    borderRadius: 12,
  },
  shortItem: {
    width: width / 2 + 30,
    height: 15,
    margin: 5,
    borderRadius: 12,
  },
})