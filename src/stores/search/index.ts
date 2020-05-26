import { types } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
  FlatListViews,
  FormState,
  FormActions,
} from '../common'


export const hotNovel = types.model({
  id: types.identifierNumber,
  title: '',
  clickNum: 0,
})

export const Search = types
  .model(`types`, {
    ...FormState,
    ...CommonState(),

    keyword: '',
  })
  .views(self => {
    return FlatListViews(self)
  })
  .actions(self => ({
    ...CommonActions(self),
    ...FormActions(self),

    setKeyword(keyword: string) {
      self.keyword = keyword
    },
  }))