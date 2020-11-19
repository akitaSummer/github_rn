import { ACTION_TYPES, onLoadMore, onRefresh } from './actionUtils'

/**
 * 获取最热数据的action
 */

export const onLoadMorePopular = (...props) =>
  onLoadMore(ACTION_TYPES.POPULAR, ...props)

export const onRefreshPopular = (...props) => {
  return onRefresh(ACTION_TYPES.POPULAR, ...props)
}
