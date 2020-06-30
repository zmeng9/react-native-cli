import React, { useCallback, useState } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { observer } from 'mobx-react-lite'
import RnCarousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel'
import { useWindowSize, useTheme } from '@/hooks'
import { IItemWidth, IItemHeight, IStyle } from './common'


const { width } = useWindowSize()

export interface ICarouselProps extends IStyle, IItemWidth, IItemHeight {
  data: any
  autoplay?: boolean
  loop?: boolean
  vertical?: boolean
  layout?: 'default' | 'stack' | 'tinder'
  inactiveDot?: boolean
  activeSlideAlignment?: 'start' | 'center' | 'end'
  activeAnimationType?: 'decay' | 'spring' | 'timing'
  renderItem?: ({ item }: any) => React.ReactElement | null
}

export const Carousel: React.SFC<ICarouselProps> = observer(({
  style,
  data,
  autoplay = false,
  loop = false,
  vertical = false,
  itemWidth = width,
  itemHeight,
  layout = `default`,
  activeSlideAlignment = `center`,
  activeAnimationType = `spring`,
  inactiveDot = false,
  renderItem,
}) => {
  const { primary, secondary } = useTheme()
  const [activeSlide, setActiveSlide] = useState(0)

  const _renderItem = useCallback(({ item }, parallaxProps) => (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item.uri }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    </View>
  ), [])

  return (
    <View style={[styles.root, style]}>
      <RnCarousel
        hasParallaxImages
        vertical={vertical}
        autoplay={autoplay}
        loop={loop}
        layout={layout}
        layoutCardOffset={20}
        activeSlideAlignment={activeSlideAlignment}
        activeAnimationType={activeAnimationType}
        loopClonesPerSide={data.length}
        data={data}
        renderItem={renderItem || _renderItem}
        itemWidth={itemWidth - 60}
        inactiveSlideOpacity={1}
        inactiveSlideScale={0.95}
        sliderWidth={itemWidth}
        itemHeight={itemHeight}
        sliderHeight={itemHeight}
        onSnapToItem={setActiveSlide}
      />
      {inactiveDot && (
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
            backgroundColor: primary,
            marginHorizontal: -8,
          }}
          containerStyle={[styles.pagination, { paddingVertical: 0, width: `100%` }]}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            backgroundColor: secondary,
            borderRadius: 5,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
  },
  item: {
    width: width - 60,
    aspectRatio: 1.8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    borderRadius: 12,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: `contain`,
    position: `relative`,
  },
  pagination: {
    position: `absolute`,
    bottom: 8,
  },
})