/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { onThemeChange } from '../store/actions/theme'
import actions from '../store/actions'
import PopularItem from '../components/PopularItem'
import { goPage } from '../navigator/NavigationUtil'
import { ACTION_TYPES } from '../store/actions/actionUtils'
import Toast from 'react-native-easy-toast'
import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import NavigationBar from '../components/NavigationBar'
import TrendingItem from '../components/TrendingItem'
import EventBus from 'react-native-event-bus'
import { EventTypes } from '../utils/EventUtils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const FavoriteTab = (props) => {
  const { type, themeColor } = props
  const storeName = type
  const favorite = useSelector((state) => state.favorite)
  const dispatch = useDispatch()
  const toastRef = useRef(null)
  const refreshFavorite = useCallback(
    (storeName, url, pageSize) => {
      dispatch(actions.onRefreshFavoriteData(storeName, url, pageSize))
    },
    [dispatch],
  )

  // 创建datas
  const createStore = () => {
    let store = favorite[storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],
      }
    }
    return store
  }

  // FlatList中Item渲染
  const renderItem = (data) => {
    const item = data.item
    const Item = storeName === ACTION_TYPES.POPULAR ? PopularItem : TrendingItem
    return (
      <Item
        projectModel={item}
        onSelect={(callback) => {
          goPage(
            {
              projectModel: item,
              type: storeName,
              callback,
            },
            'DetailPage',
          )
        }}
      />
    )
  }

  // 加载数据
  const loadData = (isShowLoading) => {
    refreshFavorite(storeName, isShowLoading)
  }

  const listener = (data) => {
    if (data.to === 2) {
      loadData(false)
    }
  }

  useEffect(() => {
    EventBus.getInstance().addListener(EventTypes.BOTTOM_TAB_SELECT, listener)
    loadData()
    return () => {
      EventBus.getInstance().removeListener(listener)
    }
  }, [])
  return (
    <View>
      <FlatList
        data={createStore().projectModels}
        renderItem={(data) => renderItem(data)}
        keyExtractor={(item) => `${item.item.id || item.item.fullName}`}
        refreshControl={
          <RefreshControl
            title={'loading'}
            titleColor={themeColor}
            colors={[themeColor]}
            refreshing={createStore().isLoading}
            onRefresh={() => loadData(true)}
            tintColor={themeColor}
          />
        }
      />
      <Toast ref={toastRef} position={'center'} />
    </View>
  )
}

const FavoritePage = (props): React$Node => {
  const { theme } = useSelector((state) => state.theme)
  const TabNavigator = (() => {
    return createAppContainer(
      createMaterialTopTabNavigator(
        {
          Popular: {
            screen: (props) => (
              <FavoriteTab
                {...props}
                type={ACTION_TYPES.POPULAR}
                themeColor={theme.themeColor}
              />
            ),
            navigationOptions: {
              title: 'hot',
            },
          },
          Trending: {
            screen: (props) => (
              <FavoriteTab
                {...props}
                type={ACTION_TYPES.TRENDING}
                themeColor={theme.themeColor}
              />
            ),
            navigationOptions: {
              title: '趋势',
            },
          },
        },
        {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            style: {
              backgroundColor: theme.themeColor,
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
          },
        },
      ),
    )
  })()

  const statusBar = {
    backgroundColor: theme.themeColor,
    barStyle: 'light-content',
  }

  const navigationBar = (
    <NavigationBar
      title={'hot'}
      statusBar={statusBar}
      style={{ backgroundColor: theme.themeColor }}
    />
  )

  return (
    <View style={styles.container}>
      {navigationBar}
      <TabNavigator />
    </View>
  )
}

export default FavoritePage
