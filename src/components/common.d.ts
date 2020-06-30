import { StyleProp, ViewStyle, TextStyle } from 'react-native'

/* 
 * Common interface
 */


export interface IStyle {
  style?: StyleProp<ViewStyle>
}

export interface ITextStyle {
  textStyle?: StyleProp<TextStyle>
}

export interface IChildren {
  children?: React.ReactNode
}

export interface IVisible {
  visible: boolean
}

export interface IRenderItem {
  renderItem: ({ item }: any) => React.ReactElement | null
}

export interface IItemWidth {
  itemWidth?: number
}

export interface IItemHeight {
  itemHeight?: number
}

export interface IBorder {
  border?: boolean
}

export interface IStartShouldSetResponderCapture {
  startShouldSetResponderCapture?: boolean
}

export interface IPress {
  onPress?: (...args: any) => void
  onLongPress?: (...args: any) => void
}

export interface IPressWithName {
  name: string
  onPress?: (...args: any) => void
}