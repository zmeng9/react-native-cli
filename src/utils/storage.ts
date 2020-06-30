import AsyncStorage from '@react-native-community/async-storage'
import { splitByComma, joinByComma, unique } from './helper'
import { logger } from './logger'


const tokenKeyName = `authToken`
const searchHistoryKeyName = `searchHistory`
const searchHistoryLimit = 8

/* 
 * Auth token
 */

export const loadAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem(tokenKeyName)
    return authToken
  } catch (err) {
    logger.error(`load token error`, err)
    return null
  }
}

export const saveAuthToken = async (token: string) => {
  if (!token && token.trim() === ``)
    return

  try {
    await AsyncStorage.setItem(tokenKeyName, token)
  } catch (err) {
    logger.error(`save token error`, err)
  }
}

export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(tokenKeyName)
  } catch (err) {
    logger.error(`remove token error`, err)
  }
}

/* 
 * Search history
 */

export const loadSearchHistory = async () => {
  const searchHistory = await AsyncStorage.getItem(searchHistoryKeyName)

  if (searchHistory) {
    const eightSearchHistorys = splitByComma(searchHistory).slice(0, searchHistoryLimit)
    return unique(eightSearchHistorys)
  }

  return null
}

export const saveSearchHistory = async (searchHistory: string) => {
  if (!searchHistory && searchHistory.trim() === ``)
    return

  const currentSearchHisyory = await AsyncStorage.getItem(searchHistoryKeyName)
  const newSearchHistory = currentSearchHisyory
    ? joinByComma(searchHistory, currentSearchHisyory)
    : searchHistory

  await AsyncStorage.setItem(searchHistoryKeyName, newSearchHistory)
}

export const removeSearchHistory = async () => {
  await AsyncStorage.removeItem(searchHistoryKeyName)
}

