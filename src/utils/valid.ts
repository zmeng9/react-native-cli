export const isEmptyObj = (obj: Object) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false
  }

  return true
}

export const eq = (str1: string, str2: string) => {
  return str1 === str2
}

export const isEmptyStr = (str: string | Array<string>) => {
  if (Array.isArray(str))
    return !!str.find(item => item.trim() === ``)

  return str.trim() === ``
}

export const max = (str: string, len: number) => {
  return str.trim().length > len
}

export const min = (str: string, len: number) => {
  return str.trim().length < len
}

export const isZero = (num: number) => {
  return num === 0
}

export const isStartWithZero = (str: string) => {
  return str.startsWith(`0`)
}

export const isUpper = (code: string) => {
  return /[A-Z]/.test(code)
}

export const isLower = (code: string) => {
  return /[a-z]/.test(code)
}

// Accept English letters, numbers and underline 
export const validLtNumUdl = (str: string) => {
  const reg = /^[A-Za-z_0-9]+$/
  return reg.test(str)
}
