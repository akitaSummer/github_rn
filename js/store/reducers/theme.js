import Types from '../types'
import ThemeFactory, { ThemeFlags } from '../../res/themeFactory'

const defaultState = {
  theme: ThemeFactory.createTheme(ThemeFlags.Default),
  onShowCustomThemeView: false,
}

const onAction = (state = defaultState, action) => {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      }
    case Types.SHOW_THEME_VIEW:
      return {
        ...state,
        customThemeViewVisible: action.customThemeViewVisible,
      }
    default:
      return state
  }
}

export default onAction
