import { onThemeChange, onShowCustomThemeView, onThemeInit } from './theme'
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
import { onLoadLanguage } from './language'
import { onSearch, onLoadMoreSearch, onSearchCancel } from './serach'

export default {
  onThemeChange,
  onRefreshPopular,
  onLoadMorePopular,
  onRefreshTrending,
  onLoadMoreTrending,
  onRefreshFavoriteData,
  onFlushPopularFavorite,
  onFlushTrendingFavorite,
  onLoadLanguage,
  onShowCustomThemeView,
  onThemeInit,
  onSearch,
  onSearchCancel,
  onLoadMoreSearch,
}
