import moment from 'moment'

/* 
 * Format data
 */

 
export const DATE = `YYYY-MM-DD`
export const DATETIME = `YYYY-MM-DD HH:mm:ss`

export const nowDate = () => {
  return moment().format(DATE)
}
export const nowDatetime = () => {
  return moment().format(DATETIME)
}

export const formatToDate = (date: Date | string) => {
  return moment(date, DATE).format(DATE)
}

export const formatToDatetime = (date: Date | string) => {
  return moment(date, DATETIME).format(DATETIME)
}

export const fromNowDate = (date: Date | string) => {
  return moment(date, DATETIME).fromNow()
}