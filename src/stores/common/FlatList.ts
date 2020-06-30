import { types } from 'mobx-state-tree'
import { findById } from '@/utils'
import { Service } from './Service'


/* 
 * Flat list state, views and actions
 */

export interface IOption {
  sort?: (a: any, b: any) => number
  filter?: (...args: any) => Array<any>
}

export const ItemSize = types.model({
  width: types.number,
  height: types.number,
})

export const HeaderSize = types.model({
  width: types.number,
  height: types.number,
})

export const FooterSize = types.model({
  width: types.number,
  height: types.number,
})

export const FlatList = (
  subtype: any,
  limit: number = 10,
  {
    sort,
    filter,
  }: IOption = {}
) => {
  return types.compose(
    Service(),
    types
      .model({
        listData: types.optional(types.array(subtype), []),
        totalCount: 0, 
        limit,
        offset: 0,
        refreshLimit: 0,
        isRefreshing: false,
        itemSize: types.optional(ItemSize, {
          width: 0,
          height: 0,
        }),
        headerSize: types.optional(HeaderSize, {
          width: 0,
          height: 0,
        }),
        footerSize: types.optional(FooterSize, {
          width: 0,
          height: 0,
        }),
      })
      .views(self => ({
        get count() {
          return self.listData.length
        },
        get listDataBySort() {
          return self.listData.slice().sort(sort)
        },
        get listDataByFilter() {
          return filter ? self.listData.filter(filter) : self.listData
        },
      }))
      .actions(self => ({
        addToListData(item: any) {
          // self.ulkRemoveIsExistItemsFromListData(self.listData, item)

          self.listData.push(item)
        },
        unshiftToListData(item: any) {
          // self.ulkRemoveIsExistItemsFromListData(self.listData, item)

          self.listData.unshift(item)
        },
        removeFromListData(item: any) {
          self.listData.remove(item)
        },
        removeFromListDataById(id: number) {
          self.listData.remove(findById(self.listData, id))
        },
        updateItem(idx: number, item: any) {
          self.listData[idx] = item
        },
        bulkAddToListData(listData: Array<any>) {
          // self.listData.forEach((item: any) => {
          //   self.ulkRemoveIsExistItemsFromListData(listData, item)
          // })

          self.listData.push(...listData)
        },
        bulkUnshiftToListData(listData: Array<any>) {
          // self.listData.forEach((item: any) => {
          //   self.ulkRemoveIsExistItemsFromListData(listData, item)
          // })

          self.listData.unshift(...listData)
        },
        // bulkRemoveIsExistItemsFromListData(listData: Array<any>, item: any) {
        //   const isFound = findById(listData, item.id)

        //   if (isFound)
        //     self.removeFromListData(item)
        // },
        resetListData() {
          self.listData.clear()
        },
        replaceListData(listData: Array<any>) {
          self.listData.replace(listData)
        },
        setTotalCount(totalCount: number) {
          self.totalCount = totalCount
        },
        setLimit(limit: number) {
          self.limit = limit
        },
        setOffset(offset: number) {
          self.offset = offset
        },
        setRefreshLimit(refreshLimit: number) {
          self.refreshLimit = refreshLimit
        },
        setIsRefreshing(isRefreshing: boolean) {
          self.isRefreshing = isRefreshing
        },
        setItemSize(itemSize: any) {
          self.itemSize = itemSize
        },
        setHeaderSize(headerSize: any) {
          self.headerSize = headerSize
        },
        setFooterSize(footerSize: any) {
          self.footerSize = footerSize
        },
      })))
}