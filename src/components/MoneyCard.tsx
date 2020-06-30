import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNormalize } from '@/hooks'
import { isEmptyStr, isStartWithZero } from '@/utils'
import { Card } from './Card'
import { Input, IInputProps } from './Input'
import { ColorfulText } from './ColorfulText'
import { Btn } from './Btn'
import { IPress } from './common'


export interface IMoneyCardProps extends IPress {
  title?: string
  text?: string
  value: IInputProps['value']
  editable?: IInputProps['editable']
  onChangeText: IInputProps['onChangeText']
}

export const MoneyCard: React.SFC<IMoneyCardProps> = observer(({
  title = `付款金额`,
  text = `确定`,
  value,
  editable,
  onChangeText,
  onPress,
}) => {
  const { normalizeSize } = useNormalize()

  return (
    <Card title={title} style={{ paddingBottom: 15 }}>
        <Input
          // autoFocus
          leftComponent={<ColorfulText text='￥' bold fontSize={24} style={{ marginLeft: 10 }} />}
          type='underline'
          value={value}
          keyboardType='numeric'
          onChangeText={onChangeText}
          editable={editable}
          style={{
            fontSize: normalizeSize(26),
            height: 40,
            paddingVertical: 7,
          }}
        />
        <Btn
          fullWidth
          text={text}
          color='primary'
          size='large'
          disabled={isEmptyStr(value) || isStartWithZero(value)}
          onPress={onPress}
        />
      </Card>
  )
})

const styles = StyleSheet.create({
  root: {
  },
})