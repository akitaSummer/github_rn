import Types from '../types'
import { languageFetch } from '../../utils/languageUtils'

export const onLoadLanguage = (flagKay) => {
  return async (dispatch) => {
    try {
      const languages = await languageFetch(flagKay)
      dispatch({
        type: Types.LANGUAGE_LOAD_SUCCESS,
        languages,
        flag: flagKay,
      })
    } catch (e) {
      throw e
    }
  }
}
