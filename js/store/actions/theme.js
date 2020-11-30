import Types from '../types'
import { getTheme } from '../../utils/themeUtils'

export const onThemeChange = (theme) => {
  return {
    type: Types.THEME_CHANGE,
    theme,
  }
}

export const onThemeInit = () => {
  return async (dispatch) => {
    const data = await getTheme()
    dispatch(onThemeChange(data))
  }
}

export const onShowCustomThemeView = (show) => {
  return {
    type: Types.SHOW_THEME_VIEW,
    customThemeViewVisible: show,
  }
}
