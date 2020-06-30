import { types } from 'mobx-state-tree'
export * from './Service'
export * from './FlatList'
export * from './Form'
export * from './VCode'
export * from './Carousel'
export * from './Collapse'
export * from './SecureText'


/* 
 * TimestampsState
 */


export const TimestampsState = {
  createdAt: types.string,
  updatedAt: types.string,
  deletedAt: types.maybeNull(types.string),
}