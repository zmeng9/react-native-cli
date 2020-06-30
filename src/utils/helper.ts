import { get, uniqueId } from 'lodash'


export const unique = (array: Array<any>) => {
  let cleanArray: Array<any> = []
  for (let item of array) {
    const isExist = cleanArray.find(i => i === item)
    if (!isExist)
      cleanArray.push(item)
  }
  return cleanArray
}

export const uniqueByKey = (array: Array<any>, key: string) => {
  let cleanArray: Array<any> = []
  for (let item of array) {
    const isExist = cleanArray.find(i => i[key] === item[key])
    if (!isExist)
      cleanArray.push(item)
  }
  return cleanArray
}

export const uniqueById = (array: Array<any>) => {
  return uniqueByKey(array, `id`)
}

export const debounce = (
  func: () => void,
  wait: number,
  immedate: boolean,
) => {
  let timeout: any
  return function () {
    const context = this
    const args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immedate) {
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(context, args as any)
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args as any)
      }, wait)
    }
  }
}

export const removeArrayLastEle = (array: Array<any>) => {
  array.splice(-1, 1)
  return array
}

export const splitByComma = (str: string) => {
  return str.split(',')
}

export const joinByComma = (str: string, anotherStr: string) => {
  return `${str},${anotherStr}`
}

export const findById = (array: Array<any>, id: number) => {
  return array.find((item: any) => item.id === id)
}

export const chunkString = (str: string, length: number) => {
  return str.match(new RegExp('.{1,' + length + '}', 'g'))
}

export const genRandomNum = (max: number) => {
  return Math.floor(Math.random() * max)
}

export const randomStr = (len: number = 7) => {
  return Math.random().toString(36).substring(len)
}

export const randomItemFromArray = (array: Array<any>) => {
  return array[Math.floor(Math.random() * array.length)]
}

export {
  get,
  uniqueId,
}