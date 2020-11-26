import AsyncStorage from '@react-native-community/async-storage'
import langs from '../res/data/langs'
import keys from '../res/data/keys'

export const FLAG_LANGUAGE = {
  FLAG_LANGUAGE: 'language_dao_language',
  FLAG_KEY: 'language_dao_key',
}

export const languageFetch = async (flag) => {
  try {
    const result = await AsyncStorage.getItem(flag)
    return Array.isArray(result)
      ? JSON.parse(result)
      : flag === FLAG_LANGUAGE.FLAG_LANGUAGE
      ? langs
      : keys
  } catch (e) {
    throw e
  }
}

export const languageSave = (flag, objectData) => {
  let stringData = JSON.stringify(objectData)
  AsyncStorage.setItem(flag, stringData)
}
