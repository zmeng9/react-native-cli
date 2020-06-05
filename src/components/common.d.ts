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

export interface IStartShouldSetResponderCapture {
  startShouldSetResponderCapture?: boolean
}

export interface IPress {
  onPress?: (...args: any) => void
  onLongPress?: (...args: any) => void
}