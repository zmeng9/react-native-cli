import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { keepDecimal, formatSercetMoney } from '@/utils'
import { ColorfulText, IColorfulTextProps } from './ColorfulText'
import { IStyle } from './common'


export interface IYuanProps extends IStyle {
  money: string | number
  sercet?: boolean
  bold?: boolean
  alwaysBlack?: boolean
  fontSize?: number
  textAlign?: IColorfulTextProps['textAlign']
}

export const Yuan: React.SFC<IYuanProps> = observer(({
  style,
  money,
  sercet,
  bold,
  alwaysBlack,
  fontSize = 30,
  textAlign = `auto`,
}) => {
  const moneyWithDecimal = keepDecimal(money as string)
  
  return (
    <ColorfulText
      style={[styles.root, style]}
      alwaysBlack={alwaysBlack}
      text={`¥ ${sercet ? formatSercetMoney(moneyWithDecimal) : moneyWithDecimal}`}
      bold={bold}
      fontSize={fontSize}
      textAlign={textAlign}
    />
  )
})

const styles = StyleSheet.create({
  root: {
  },
})