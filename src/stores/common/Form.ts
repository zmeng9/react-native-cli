import { types } from 'mobx-state-tree'


export const Form = () => {
  return types
    .model({
      isSubmit: false,
    })
    .actions(self => ({
      setIsSubmit(isSubmit: boolean) {
        self.isSubmit = isSubmit
      }
    }))
}