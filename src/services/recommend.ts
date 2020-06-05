import axios from 'axios'
import { ICommonParams } from './common'
import { request } from '@/utils'


export interface IGetLocation {
  location: string
}

export const getLocation = (params: IGetLocation) => {
  return axios.get(`/v3/geocode/regeo`, { 
    baseURL: `https://restapi.amap.com`,
    params: {
      key: `126ac5fa2f7dc2b1634dd880f2185c81`,
      ...params,
    },
  })
}

export const getRecommends = (params: ICommonParams) => {
  return request.get(`/types/novels`, { params })
}

export const getNovelsByType = (params: ICommonParams) => {
  return request.get(`/types/novels`, { params })
}