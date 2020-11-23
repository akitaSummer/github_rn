import {
  ACTION_TYPES,
  onFlushFavorite,
  onLoadMore,
  onRefresh,
} from './actionUtils'

export const onLoadMoreTrending = (...props) =>
  onLoadMore(ACTION_TYPES.TRENDING, ...props)

export const onRefreshTrending = (...props) =>
  onRefresh(ACTION_TYPES.TRENDING, ...props)

export const onFlushTrendingFavorite = (...props) => {
  return onFlushFavorite(ACTION_TYPES.TRENDING, ...props)
}
