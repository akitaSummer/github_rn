import AsyncStorage from '@react-native-community/async-storage'
import { ACTION_TYPES } from '../store/actions/actionUtils'

const FAVORITE_KEY_PREFIX = 'favorite_'

const updateFavoriteKeys = async (page, key, isAdd) => {
  const favoriteKey = FAVORITE_KEY_PREFIX + page
  try {
    const result = await AsyncStorage.getItem(favoriteKey)
    const favoriteKeys = JSON.parse(result) || []
    let index = favoriteKeys.indexOf(key)
    if (isAdd) {
      if (index === -1) favoriteKeys.push(key)
    } else {
      if (index !== -1) favoriteKeys.splice(index, 1)
    }
    AsyncStorage.setItem(favoriteKey, JSON.stringify(favoriteKeys))
  } catch (e) {
    throw e
  }
}

export const saveFavoriteItem = (page, key, value, callback) => {
  AsyncStorage.setItem(key, value, (error, result) => {
    if (!error) {
      updateFavoriteKeys(page, key, true)
    }
  })
}

export const getFavoriteKeys = async (page) => {
  const favoriteKey = FAVORITE_KEY_PREFIX + page
  try {
    const result = await AsyncStorage.getItem(favoriteKey)
    return JSON.parse(result)
  } catch (e) {
    throw e
  }
}

export const removeFavoriteItem = (page, key) => {
  AsyncStorage.removeItem(key, (err, result) => {
    if (!err) updateFavoriteKeys(page, key, false)
  })
}

export const getAllItem = async (type) => {
  try {
    const keys = await getFavoriteKeys(type)
    const items = []
    const stores = await AsyncStorage.multiGet(keys)
    stores.forEach((result, i, stores) => {
      const key = stores[i][0]
      const value = stores[i][1]
      if (value) items.push(JSON.parse(value))
    })
    return items
  } catch (e) {
    throw e
  }
}

export const checkFavorite = (item, keys, type) => {
  if (!keys) return false
  for (let i = 0; i < keys.length; i++) {
    const id = type === ACTION_TYPES.POPULAR ? item.id : item.fullName
    if (id.toString() === keys[i]) {
      return true
    }
  }
  return false
}

export const onFavorite = (page, item, isFavorite) => {
  const key =
    page === ACTION_TYPES.TRENDING ? item.fullName : item.id.toString()
  if (isFavorite) {
    saveFavoriteItem(page, key, JSON.stringify(item))
  } else {
    removeFavoriteItem(page, key)
  }
}
