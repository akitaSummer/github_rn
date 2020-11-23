import Types from '../types'

export const REDUCER_TYPES = {
  POPULAR: 'POPULAR',
  TRENDING: 'TRENDING',
}

export const onReducerAction = (state, action, type) => {
  console.log(action.type, state)
  switch (action.type) {
    case Types[`${type}_REFRESH_SUCCESS`]:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          projectModes: action.projectModes,
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      }
    case Types[`${type}_REFRESH`]:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true,
        },
      }
    case Types[`${type}_REFRESH_FAIL`]:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      }
    case Types[`${type}_LOAD_MORE_SUCCESS`]:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      }
    case Types[`${type}_LOAD_MORE_FAIL`]:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        },
      }
    case Types[`${type}_FLUSH_FAVORITE`]:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
        },
      }
    default:
      return state
  }
}
