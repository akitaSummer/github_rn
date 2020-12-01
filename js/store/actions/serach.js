import Types from '../types'
import { projectModels, doCallBack, handleData } from './actionUtils'
import { remove } from '../../utils/arrayUtils'
import { checkKeyIsExist } from '../../utils/favoriteUtils'

const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const CANCEL_TOKENS = []

export const onSearch = (
  inputKey,
  pageSize,
  token,
  type,
  popularKeys,
  callBack,
) => {
  return (dispatch) => {
    dispatch({ type: Types.SEARCH_REFRESH })
    fetch(genFetchUrl(inputKey))
      .then((response) => {
        //如果任务取消，则不做任何处理
        return hasCancel(token) ? null : response.json()
      })
      .then((responseData) => {
        if (hasCancel(token, true)) {
          //如果任务取消，则不做任何处理
          console.log('user cancel')
          return
        }
        if (
          !responseData ||
          !responseData.items ||
          responseData.items.length === 0
        ) {
          dispatch({
            type: Types.SEARCH_FAIL,
            message: `没找到关于${inputKey}的项目`,
          })
          doCallBack(callBack, `没找到关于${inputKey}的项目`)
          return
        }
        let items = responseData.items
        handleData(
          Types.SEARCH_REFRESH_SUCCESS,
          dispatch,
          '',
          { data: items },
          pageSize,
          type,
          {
            showBottomButton: !checkKeyIsExist(popularKeys, inputKey),
            inputKey,
          },
        )
      })
      .catch((e) => {
        console.log(e)
        dispatch({ type: Types.SEARCH_FAIL, error: e })
      })
  }
}

export const onSearchCancel = (token) => {
  return (dispatch) => {
    CANCEL_TOKENS.push(token)
    dispatch({ type: Types.SEARCH_CANCEL })
  }
}

export const onLoadMoreSearch = (
  pageIndex,
  pageSize,
  dataArray = [],
  type,
  callBack,
) => {
  return (dispatch) => {
    setTimeout(() => {
      //模拟网络请求
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        //已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more')
        }
        dispatch({
          type: Types.SEARCH_LOAD_MORE_FAIL,
          error: 'no more',
          pageIndex: --pageIndex,
        })
      } else {
        //本次和载入的最大数量
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex
        projectModels(dataArray.slice(0, max), type, (data) => {
          dispatch({
            type: Types.SEARCH_LOAD_MORE_SUCCESS,
            pageIndex,
            projectModels: data,
          })
        })
      }
    }, 500)
  }
}

const genFetchUrl = (key) => {
  return API_URL + key + QUERY_STR
}

const hasCancel = (token, isRemove) => {
  if (CANCEL_TOKENS.includes(token)) {
    isRemove && remove(CANCEL_TOKENS, token)
    return true
  }
  return false
}
