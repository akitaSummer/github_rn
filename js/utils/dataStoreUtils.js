import AsyncStorage from '@react-native-community/async-storage'
import Trending from 'GitHubTrending'

const AUTH_TOKEN = 'fd82d1e882462e23b8e88aa82198f166'

export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending',
}

const wrapData = (data) => {
  return {
    data,
    timestamp: new Date().getTime(),
  }
}

const checkTimestampValid = (timestamp) => {
  const currentData = new Date()
  const targetDate = new Date()
  targetDate.setTime(timestamp)
  if (currentData.getMonth() !== targetDate.getMonth()) return false
  if (currentData.getDate() !== targetDate.getDate()) return false
  return currentData.getHours() - targetDate.getHours() <= 4
}

const saveData = async (url, data) => {
  if (!data || !url) return
  try {
    await AsyncStorage.setItem(url, JSON.stringify(wrapData(data)))
  } catch (e) {
    throw e
  }
}

const fetchLocalData = async (url) => {
  try {
    const result = await AsyncStorage.getItem(url)
    return JSON.parse(result)
  } catch (e) {
    throw e
  }
}

const fetchNetData = async (url, flag) => {
  try {
    if (flag !== FLAG_STORAGE.flag_trending) {
      const result = await fetch(url)
      if (result.ok) {
        const resultData = await result.json()
        saveData(url, resultData)
        return resultData
      }
      throw new Error('Network response was not ok.')
    } else {
      const items = await new Trending(AUTH_TOKEN).fetchTrending(url)
      if (!items) {
        throw new Error('responseData is null')
      }
      saveData(url, items)
      return items
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const fetchData = async (url, flag) => {
  try {
    const wrapData = await fetchLocalData(url)
    if (wrapData && checkTimestampValid(wrapData.timestamp)) {
      return wrapData
    } else {
      return wrapData(await fetchNetData(url, flag))
    }
  } catch (e) {
    try {
      return wrapData(await fetchNetData(url, flag))
    } catch (e) {
      throw e
    }
  }
}
