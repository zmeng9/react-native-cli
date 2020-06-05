export interface IRelativeTime {
  future: string
  past: string
  s: string
  ss: string
  m: string
  mm: string
  h: string
  hh: string
  d: string
  dd: string
  w: string
  ww: string
  M: string
  MM: string
  y: string
  yy: string
}

export interface ILocale {
  relativeTime: IRelativeTime
}