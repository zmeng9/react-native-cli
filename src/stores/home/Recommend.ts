import { types } from 'mobx-state-tree'
import {
  CommonState,
  CommonActions,
} from '../common'


export const Recommend = types
  .model({
    ...CommonState(),
  })
  .actions(self => ({
    ...CommonActions(self),
  }))