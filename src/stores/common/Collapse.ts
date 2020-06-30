import { types } from 'mobx-state-tree'


export const Collapse = () => {
  return types
    .model({
      isCollapsed: false,
    })
    .actions(self => ({
      switchIsCollapsed() {
        self.isCollapsed = !self.isCollapsed
      },
      setIsCollapsed(isCollapsed: boolean) {
        self.isCollapsed = isCollapsed
      },
    }))
}