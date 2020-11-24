/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  DeviceInfo,
} from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { useSelector, useDispatch } from 'react-redux'
import NavigationBar from '../components/NavigationBar'
import actions from '../store/actions'
import PopularItem from '../components/PopularItem'
import Toast from 'react-native-easy-toast'
import { goPage } from '../navigator/NavigationUtil'
import { ACTION_TYPES } from '../store/actions/actionUtils'
import EventBus from 'react-native-event-bus'
import { EventTypes } from '../utils/EventUtils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
})

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
const PAGESIZE = 10

const PopularTab = (props) => {
  const { tabLabel } = props
  let canLoadMore
  const storeName = tabLabel
  let isFavoriteChanged = false
  const popular = useSelector((state) => state.popular)
  const dispatch = useDispatch()
  const toastRef = useRef(null)
  const refreshPopular = useCallback(
    (storeName, url, pageSize) => {
      dispatch(actions.onRefreshPopular(storeName, url, pageSize))
    },
    [dispatch],
  )
  const loadMorePopular = useCallback(
    (storeName, url, pageSize, items, callback) => {
      dispatch(
        actions.onLoadMorePopular(storeName, url, pageSize, items, callback),
      )
    },
    [dispatch],
  )

  const flushPopularFavorite = useCallback(
    (storeName, pageIndex, pageSize, items) => {
      dispatch(
        actions.onFlushPopularFavorite(storeName, pageIndex, pageSize, items),
      )
    },
  )

  // 创建datas
  const createStore = () => {
    let store = popular[storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],
        hideLoadingMore: true,
      }
    }
    return store
  }

  // FlatList中Item渲染
  const renderItem = (data) => {
    const item = data.item
    return (
      <PopularItem
        projectModel={item}
        onSelect={(callback) => {
          goPage(
            {
              projectModel: item,
              type: ACTION_TYPES.POPULAR,
              callback,
            },
            'DetailPage',
          )
        }}
      />
    )
  }

  // FooterComponent创建
  const genIndicator = () => {
    return createStore().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={'large'}
          animating={true}
          color={'red'}
        />
        <Text>Loading more...</Text>
      </View>
    )
  }

  // 拼接url字符串
  const genFetchUrl = (key) => {
    return URL + key + QUERY_STR
  }
  // 加载数据
  const loadData = (loadMore, refreshFavorite) => {
    const store = createStore()
    const url = genFetchUrl(storeName)
    if (loadMore) {
      loadMorePopular(
        storeName,
        ++store.pageIndex,
        PAGESIZE,
        store.items,
        (callback) => {
          toastRef.current.show('no more')
        },
      )
    } else if (refreshFavorite) {
      if (store.items.length)
        flushPopularFavorite(storeName, store.pageIndex, PAGESIZE, store.items)
    } else {
      refreshPopular(storeName, url, PAGESIZE)
    }
  }

  const favoriteChangeListener = () => {
    isFavoriteChanged = true
  }

  const bottomTabSelectListener = (data) => {
    if (data.to === 0 && isFavoriteChanged) {
      loadData()
    }
  }

  useEffect(() => {
    loadData()
    EventBus.getInstance().addListener(
      EventTypes.FAVORITE_CHANGE_POPULAR,
      favoriteChangeListener,
    )
    EventBus.getInstance().addListener(
      EventTypes.BOTTOM_TAB_SELECT,
      bottomTabSelectListener,
    )
    return () => {
      EventBus.getInstance().removeListener(favoriteChangeListener)
      EventBus.getInstance().removeListener(bottomTabSelectListener)
    }
  }, [])
  return (
    <View>
      <FlatList
        data={createStore().projectModes}
        renderItem={(data) => renderItem(data)}
        keyExtractor={(item) => `${item.item.id}`}
        refreshControl={
          <RefreshControl
            title={'loading'}
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={createStore().isLoading}
            onRefresh={() => loadData()}
            tintColor={THEME_COLOR}
          />
        }
        ListFooterComponent={() => genIndicator()}
        onEndReached={() => {
          setTimeout(() => {
            if (canLoadMore) {
              loadData(true)
              canLoadMore = false
            }
          }, 100)
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          canLoadMore = true
        }}
      />
      <Toast ref={toastRef} position={'center'} />
    </View>
  )
}

const PopularPage = (props): React$Node => {
  const [tabNames, setTabNames] = useState([
    'Java',
    'Android',
    'ios',
    'React Native',
  ])

  const TabNavigator = (() => {
    const tabs = {}
    tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <PopularTab {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      }
    })

    return createAppContainer(
      createMaterialTopTabNavigator(tabs, {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: THEME_COLOR,
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      }),
    )
  })()

  const statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  }

  const navigationBar = (
    <NavigationBar
      title={'hot'}
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR }}
    />
  )

  return (
    <View style={styles.container}>
      {navigationBar}
      <TabNavigator />
    </View>
  )
}

export default PopularPage
