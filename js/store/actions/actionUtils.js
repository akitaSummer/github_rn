import Types from '../types'
import { fetchData, FLAG_STORAGE } from '../../utils/dataStoreUtils'

export const ACTION_TYPES = {
  POPULAR: 'POPULAR',
  TRENDING: 'TRENDING',
}

const handleData = (actionType, dispatch, storeName, data, pageSize) => {
  const fixItems = []
  if (data?.data) {
    if (Array.isArray(data.data)) {
      data.data.forEach((item) => fixItems.push(item))
    } else if (Array.isArray(data.data.items)) {
      data.data.items.forEach((item) => fixItems.push(item))
    }
  }
  dispatch({
    type: actionType,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName,
    pageIndex: 1,
    items: fixItems,
  })
}

export const onLoadMore = (
  type,
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
          type: Types[`${type}_LOAD_MORE_FAIL`],
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        })
      } else {
        const max = Math.max(pageSize * pageIndex, dataArray.length)
        dispatch({
          type: Types[`${type}_LOAD_MORE_SUCCESS`],
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        })
      }
    }, 500)
  }
}

export const onRefresh = (type, storeName, url, pageSize) => {
  return async (dispatch) => {
    dispatch({
      type: Types[`${type}_REFRESH`],
      storeName,
    })
    try {
      const data = await fetchData(
        url,
        FLAG_STORAGE[`flag_${type.toLowerCase()}`],
      )
      handleData(
        Types[`${type}_REFRESH_SUCCESS`],
        dispatch,
        storeName,
        data,
        pageSize,
      )
    } catch (e) {
      dispatch({
        type: Types[`${type}_REFRESH_FAIL`],
        storeName,
        error,
      })
    }
  }
}
