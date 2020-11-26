import Types from '../types'
import { FLAG_LANGUAGE } from '../../utils/languageUtils'

const defaultState = {
  languages: [],
  keys: [],
}

const onAction = (state = defaultState, action) => {
  switch (action.type) {
    case Types.LANGUAGE_LOAD_SUCCESS:
      if (FLAG_LANGUAGE.FLAG_KEY === action.flag) {
        return {
          ...state,
          keys: action.languages,
        }
      } else {
        return {
          ...state,
          languages: action.languages,
        }
      }
    default:
      return state
  }
}

export default onAction
