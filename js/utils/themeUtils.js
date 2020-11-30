import AsyncStorage from '@react-native-community/async-storage'
import langs from '../res/data/langs'
import keys from '../res/data/keys'
import { ThemeFlags } from '../res/themeFactory'
import ThemeFactory from '../res/themeFactory'

const THEME_KEY = 'theme_key'

export const getTheme = async () => {
  try {
    let result = await AsyncStorage.getItem(THEME_KEY)
    if (!result) {
      saveTheme(ThemeFlags.Default)
      result = ThemeFlags.Default
    }
    return ThemeFactory.createTheme(result)
  } catch (e) {
    throw e
  }
}

export const saveTheme = (themeFlag) => {
  AsyncStorage.setItem(THEME_KEY, themeFlag, (error) => {})
}
