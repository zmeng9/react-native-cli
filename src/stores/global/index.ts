import { types } from 'mobx-state-tree'

const Location = types.model({
  city: ``,
  district: ``,
})

export const Global = types
  .model({
    headerHeight: 0,
    location: types.maybeNull(Location),
  })
  .actions(self => ({
    setHeaderHeight(headerHeight: any) {
      self.headerHeight = headerHeight
    },
    setLocation(location: any) {
      self.location = location
    },
  }))