import { types } from 'mobx-state-tree'


export const CarouselItem = types.model({
  id: -1,
  uri: types.string,
})

export const Carousel = () => {
  return types
    .model({
      carousels: types.optional(types.array(CarouselItem), []),
    })
    .actions(self => ({
      setCarousels(carousels: any) {
        self.carousels = carousels
      }
    }))
}