import Toast from 'react-native-root-toast'

 
/*
 * Encapsulation of the colorful "console.log", usage:
*/


export const consoleTheme = {
  info: `color: darkcyan; font-style: italic;`,
  success: `color: green; font-weight: bold;`,
  fail: `color: #e67e22;`,
  warn: `color: #fdcb6e;`,
  error: `color: red; font-weight: bold;`,
}

const log = (themeType: keyof typeof consoleTheme, msg?: string, data?: any) => {
  if (data !== undefined)
    console.log(`%c${msg}`, consoleTheme[themeType], data)
  else
    console.log(`%c${msg}`, consoleTheme[themeType])
}

const info = (msg?: string, data?: any) => {
  return log(`info`, msg, data)
}

const success = (msg?: string, data?: any) => {
  return log(`success`, msg, data)
}

const warn = (msg?: string, data?: any) => {
  return log(`warn`, msg, data)
}

const error = (msg?: string, data?: any) => {
  return log(`error`, msg, data)
}

const toast = (msg: any, type?: `error` | `fail`) => {
  return Toast.show(JSON.stringify(msg), {
    duration: Toast.durations.LONG,
    position: 100,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: type === `fail` ? `#ff9800` : `#f44336`
  })
}

export const logger = {
  info,
  success,
  warn,
  error,
  toast,
}