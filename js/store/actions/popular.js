import Types from '../types'
import { fetchData } from '../../utils/dataStoreUtils'

/**
 * 获取最热数据的action
 */

const handleData = (dispatch, storeName, data, pageSize) => {
  const fixItems = []
  if (data?.data?.items) {
    data.data.items.forEach((item) => fixItems.push(item))
  }
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName,
    pageIndex: 1,
    items: fixItems,
  })
}

export const onLoadMorePopular = (
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callback,
) => {
  return (dispatch) => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callback === 'function') {
          callback('no more')
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        })
      } else {
        const max = Math.max(pageSize * pageIndex, dataArray.length)
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        })
      }
    }, 500)
  }
}

export const onRefreshPopular = (storeName, url, pageSize) => {
  return async (dispatch) => {
    dispatch({
      type: Types.POPULAR_REFRESH,
      storeName,
    })
    try {
      const data = await fetchData(url)
      handleData(dispatch, storeName, data, pageSize)
    } catch (e) {
      dispatch({
        type: Types.POPULAR_LOAD_MORE_FAIL,
        storeName,
        error,
      })
    }
  }
}
