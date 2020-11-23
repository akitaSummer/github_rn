import { onThemeChange } from './theme'
import {
  onRefreshPopular,
  onLoadMorePopular,
  onFlushPopularFavorite,
} from './popular'
import {
  onRefreshTrending,
  onLoadMoreTrending,
  onFlushTrendingFavorite,
} from './trending'
import { onRefreshFavoriteData } from './favorite'

export default {
  onThemeChange,
  onRefreshPopular,
  onLoadMorePopular,
  onRefreshTrending,
  onLoadMoreTrending,
  onRefreshFavoriteData,
  onFlushPopularFavorite,
  onFlushTrendingFavorite,
}
