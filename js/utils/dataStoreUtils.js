import AsyncStorage from '@react-native-community/async-storage'

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

const fetchNetData = async (url) => {
  try {
    const result = await fetch(url)
    if (result.ok) {
      const resultData = await result.json()
      saveData(url, resultData)
      return resultData
    }
    throw new Error('Network response was not ok.')
  } catch (e) {
    throw e
  }
}

export const fetchData = async (url) => {
  try {
    const wrapData = await fetchLocalData(url)
    if (wrapData && checkTimestampValid(wrapData.timestamp)) {
      return wrapData
    } else {
      return wrapData(await fetchNetData(url))
    }
  } catch (e) {
    try {
      return wrapData(await fetchNetData(url))
    } catch (e) {
      throw e
    }
  }
}
