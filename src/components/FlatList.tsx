import React, { useCallback } from 'react'
import { StyleSheet, FlatList as RnFlatList } from 'react-native'
import { observer } from 'mobx-react-lite'
import { Loading } from './Loading'
import { Skeleton } from './Skeleton'
import { NoData } from './NoData'
import { ViewSize } from '@/components'
import { useIsFirstRender, useToast, useFocusEffect, useSafeArea } from '@/hooks'
import { IStyle, IRenderItem } from './common'

export interface IFlatListProps extends IStyle, IRenderItem {
  store: any
  result: any
  extraData?: any
  refreshData?: any
  noDataText?: string
  useSkeleton?: boolean
  alwaysBounceVertical?: boolean
  numColumns?: number
  itemDeps?: Array<any>
  renderHeader?: (props?: any) => React.ReactElement | null
  renderFooter?: (props?: any) => React.ReactElement | null
}

export const FlatList: React.FC<IFlatListProps> = observer(({
  style,
  store,
  result,
  extraData,
  refreshData,
  noDataText,
  useSkeleton = true,
  alwaysBounceVertical = true,
  numColumns = 1,
  itemDeps = [],
  renderItem,
  renderHeader,
  renderFooter,
}) => {
  const { bottom } = useSafeArea()
  const toast = useToast()
  const isFirstRender = useIsFirstRender()

  const {
    isLoading,
    error,
    limit,
    offset,
    refreshLimit,
    isRefreshing,
    listData,
    count,
    totalCount,
    itemSize,
    headerSize,
    footerSize,
    bulkAddToListData,
    bulkUnshiftToListData,
    replaceListData,
    setOffset,
    setRefreshLimit,
    setIsRefreshing,
    setTotalCount,
    setHeaderSize,
    setItemSize,
    setFooterSize,
  } = store

  const totalHeight = (() => {
    const paddingV = 10 + (bottom || 10)
    const cloumnCount = Math.ceil(count / numColumns)
    const itemTotalHeight = itemSize.height * cloumnCount
    const totalHeight = itemTotalHeight + headerSize.height + footerSize.height + paddingV
    return !!itemTotalHeight ? totalHeight : `100%`
  })()

  useFocusEffect(() => {
    if (result && result.data) {
      const { rows = [], count = 0 } = result.data

      if (offset === 0)
        replaceListData(rows)
      else
        bulkAddToListData(rows)

      setTotalCount(count)
    }
  }, [result])

  // Refreshing data
  useFocusEffect(() => {
    if ((refreshData && isRefreshing) || (refreshData && refreshLimit > 0)) {
      const { rows = [], count = 0 } = refreshData

      // If the count of new listData is more than the pre count of listData 
      if (refreshLimit > 0) {
        bulkUnshiftToListData(rows)
        setRefreshLimit(0)

        toast(`已更新`)
      } if (count > totalCount) {
        const newDataCount = count - totalCount
        setRefreshLimit(newDataCount)
        setTotalCount(count)
        setIsRefreshing(false)
      } else {
        toast(`暂无新的内容`)
      }

      setIsRefreshing(false)
    }
  }, [refreshData])

  /* 
   * 1. Refreshing new Data is happening error
   * 2. Set refresh limit be 3 beacuse the user maybe refreshing when error is not
   */

  useFocusEffect(() => {
    if (!isFirstRender && error) {
      setIsRefreshing(false)
      setRefreshLimit(3)
    }
  }, [error, isRefreshing])

  const loadMoreData = useCallback(() => {
    if (!isLoading && (offset < count) && (totalCount > limit))
      setOffset(offset + limit)
  }, [offset, limit, isLoading, count, totalCount])

  const handleRefreshing = useCallback(() => {
    setIsRefreshing(true)
  }, [])

  const keyExtractor = useCallback((item: any, index: number) => {
    return String(item.id || index)
  }, [])

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: itemSize.height,
    offset: itemSize.height * index + headerSize.height + footerSize.height,
    index,
  }), [])

  const _renderHeader = useCallback((args?: any) => (
    <ViewSize setSize={setHeaderSize}>
      {renderHeader && renderHeader()}
    </ViewSize>
  ), [extraData])

  const _renderItem = useCallback((args: any) => (
    <ViewSize setSize={setItemSize}>
      {renderItem(args)}
    </ViewSize>
  ), itemDeps)

  const _renderFooter = useCallback((args?: any) => {
    return (
      <ViewSize setSize={setFooterSize}>
        {renderFooter && renderFooter()}
        {(isLoading && totalCount > 0) ? <Loading /> : null}
      </ViewSize>
    )
  }, [extraData])

  return (
    <RnFlatList
      contentContainerStyle={[
        styles.root,
        {
          paddingBottom: bottom || 10,
          height: totalHeight,
        },
        style,
      ]}
      data={numColumns > 1 ? listData.slice() : listData}
      extraData={extraData}
      scrollIndicatorInsets={{ right: 1 }}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='handled'
      alwaysBounceVertical={isLoading || alwaysBounceVertical}
      refreshing={isRefreshing}
      onRefresh={refreshData === undefined ? null : handleRefreshing}
      keyExtractor={keyExtractor}
      ListEmptyComponent={
        isLoading
          ? (
            useSkeleton
              ? <Skeleton layout='list' isLoading={isLoading} />
              : <Loading fullScreen />)
          : <NoData text={noDataText} />
      }
      ListHeaderComponent={listData.length && _renderHeader}
      ListFooterComponent={_renderFooter}
      renderItem={_renderItem}
      initialNumToRender={limit}
      numColumns={numColumns}
      onEndReachedThreshold={0.1}
      onEndReached={loadMoreData}
      getItemLayout={getItemLayout}
    />
  )
})

const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
  },
})