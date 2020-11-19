import { ACTION_TYPES, onLoadMore, onRefresh } from './actionUtils'

export const onLoadMoreTrending = (...props) =>
  onLoadMore(ACTION_TYPES.TRENDING, ...props)

export const onRefreshTrending = (...props) =>
  onRefresh(ACTION_TYPES.TRENDING, ...props)
