import Types from '../types'
import { fetchData, FLAG_STORAGE } from '../../utils/dataStoreUtils'
import { getFavoriteKeys, checkFavorite } from '../../utils/favoriteUtils'

export const ACTION_TYPES = {
  POPULAR: 'POPULAR',
  TRENDING: 'TRENDING',
  FAVORITE: 'FAVORITE',
}

export class ProjectModel {
  constructor(item, isFavorite) {
    this.item = item
    this.isFavorite = isFavorite
  }
}

const projectModels = async (type, showItems, callback) => {
  try {
    const keys = await getFavoriteKeys(type)
    const projectModels = []
    showItems.forEach((item, i) => {
      projectModels.push(
        new ProjectModel(showItems[i], checkFavorite(showItems[i], keys, type)),
      )
    })
    if (typeof callback === 'function') {
      callback(projectModels)
    }
  } catch (e) {
    throw e
  }
}

export const handleData = (
  actionType,
  dispatch,
  storeName,
  data,
  pageSize,
  type,
  params,
) => {
  const fixItems = []
  if (data?.data) {
    if (Array.isArray(data.data)) {
      data.data.forEach((item) => fixItems.push(item))
    } else if (Array.isArray(data.data.items)) {
      data.data.items.forEach((item) => fixItems.push(item))
    }
  }

  const showItems =
    pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize)

  projectModels(type, showItems, (projectModels) => {
    dispatch({
      type: actionType,
      projectModes: projectModels,
      storeName,
      pageIndex: 1,
      items: fixItems,
      ...params,
    })
  })
}

export const onLoadMore = (
  type,
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  favorite,
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
        projectModels(type, dataArray.slice(0, max), (projectModels) => {
          dispatch({
            type: Types[`${type}_LOAD_MORE_SUCCESS`],
            storeName,
            pageIndex,
            projectModes: projectModels,
          })
        })
      }
    }, 500)
  }
}

export const onRefresh = (type, storeName, url, pageSize, favorite) => {
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
        type,
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

export const onFlushFavorite = (
  type,
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
) => {
  return (dispatch) => {
    const max = Math.max(pageSize * pageIndex, dataArray.length)
    projectModels(type, dataArray.slice(0, max), (projectModels) => {
      dispatch({
        type: Types[`${type}_FLUSH_FAVORITE`],
        storeName,
        pageIndex,
        projectModes: projectModels,
      })
    })
  }
}

export const doCallBack = (callBack, object) => {
  if (typeof callBack === 'function') {
    callBack(object)
  }
}
