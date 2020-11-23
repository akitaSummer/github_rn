import Types from '../types'
import { getAllItem } from '../../utils/favoriteUtils'
import { ProjectModel } from './actionUtils'

export const onRefreshFavoriteData = (type, isShowLoading) => {
  return async (dispatch) => {
    if (isShowLoading)
      dispatch({ type: Types.FAVORITE_REFRESH, storeName: type })
    try {
      const items = await getAllItem(type)
      const resultData = items.map((item, i) => {
        return new ProjectModel(item, true)
      })
      dispatch({
        type: Types.FAVORITE_REFRESH_SUCCESS,
        projectModels: resultData,
        storeName: type,
      })
    } catch (e) {
      dispatch({
        type: Types.FAVORITE_REFRESH_FAIL,
        error: e,
        storeName: type,
      })
    }
  }
}
