import Types from '../types'

const defaultState = {}

const onAction = (state = defaultState, action) => {
  switch (action.type) {
    case Types.FAVORITE_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        },
      }
    case Types.FAVORITE_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
          projectModels: action.projectModels,
        },
      }
    case Types.FAVORITE_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      }
    default:
      return state
  }
}

export default onAction
