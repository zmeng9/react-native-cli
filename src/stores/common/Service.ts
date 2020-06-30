import { types, applySnapshot } from 'mobx-state-tree'


/* 
 * Service state and action
 */

export const Service = (isLoading = true) => {
  return types
    .model({
      isLoading,
      isLoadingCount: 0,
      error: types.maybeNull(types.string),
    })
    .actions(self => ({
      setIsLoading(isLoading: boolean) {
        self.isLoading = isLoading
      },
      openIsLoading() {
        self.isLoading = true
        self.isLoadingCount++
      },
      closeIsLoading() {
        self.isLoadingCount--
        if (self.isLoadingCount <= 0) {
          self.isLoading = false
          self.isLoadingCount = 0
        }
      },
      setError(error: string | null) {
        self.error = error
      },
      reset() {
        applySnapshot(self, {})
      },
    }))
}