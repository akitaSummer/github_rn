import { REDUCER_TYPES, onReducerAction } from './reducerUtils'

const defaultState = {}
/**
 * trending action
 * trending: {
 *   java: {
 *     items: [],
 *     isLoading: false
 *   },
 *   ios: {
 *     items: [],
 *     isLoading: false
 *   }
 * }
 * @param state
 * @param action
 */
const onAction = (state = defaultState, action) =>
  onReducerAction(state, action, REDUCER_TYPES.TRENDING)

export default onAction
