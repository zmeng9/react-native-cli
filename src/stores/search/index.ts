import { types } from 'mobx-state-tree'
import { FlatList, Form } from '../common'


export const ListItem = types.model({

})

export const Search = types.compose(
  FlatList(ListItem),
  Form(),
  types
    .model({
      keyword: ``,
    })
    .actions(self => ({
      setKeyword(keyword: string) {
        self.keyword = keyword
      },
    })))