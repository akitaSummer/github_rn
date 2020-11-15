import Types from '../types'

const defaultState = {
  theme: 'red',
}

const onAction = (state = defaultState, action) => {
  switch (action.type) {
    case Types.THEME_CHANGE:
      console.log(action)
      return {
        ...state,
        theme: action.theme,
      }
    default:
      return state
  }
}

export default onAction
