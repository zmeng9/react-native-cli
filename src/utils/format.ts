import { toJS } from 'mobx'
import { chunkString } from './helper'

export const formatBankCardNumber = (cardNumber: string) => {
  const bankCardNumberArray = chunkString(cardNumber, 4)

  if (!bankCardNumberArray)
    return ``

  return bankCardNumberArray.join(` `)
}

export const toCurrMoney = (money: string) => {
  return Math.round(Number(money) * 100)
}

export const formatSercetFourString = (str: string) => {
  return `*****${str.slice(-4)}`
}

export const numInputFilter = (val: string) => {
  return /^\d*\.?\d*$/.test(val)
}

export const formatSercetMoney = (value: string | number) => {
  return '*'.repeat(String(value).length - 1)
}

export const formatMoney = (number: number) => {
  const numStr = String(number)
  
  if (numStr.length === 1)
    return `${number}分`
  else if (numStr.length === 2)
    return `${numStr.slice(0, 1)}角`
  else
    return `${numStr.slice(0, -2)}元`
}

export const keepDecimal = (number: string | number, digit: number = 2) => {
  const numberStr = String(number)

  if (numberStr === `0`)
    return `0.00`

  const int = String(numberStr).slice(0, -digit)
  const decimal = String(numberStr).slice(-digit)
  return `${int}.${decimal}`
}

export {
  toJS,
}