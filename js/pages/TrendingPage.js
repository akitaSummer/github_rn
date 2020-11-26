/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  DeviceInfo,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { useSelector, useDispatch } from 'react-redux'
import NavigationBar from '../components/NavigationBar'
import actions from '../store/actions'
import TrendingItem from '../components/TrendingItem'
import Toast from 'react-native-easy-toast'
import TrendingDialog, { TimeSpans } from '../components/TrendingDialog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { goPage } from '../navigator/NavigationUtil'
import { ACTION_TYPES } from '../store/actions/actionUtils'
import EventBus from 'react-native-event-bus'
import { EventTypes } from '../utils/EventUtils'
import { FLAG_LANGUAGE } from '../utils/languageUtils'

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

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE'
const URL = 'https://github.com/trending/'
const THEME_COLOR = '#678'
const PAGESIZE = 10

const TrendingTab = (props) => {
  const { tabLabel } = props
  let { timeSpan } = props
  let canLoadMore
  const storeName = tabLabel
  let isFavoriteChanged = false
  const Trending = useSelector((state) => state.trending)
  const dispatch = useDispatch()
  const toastRef = useRef(null)
  const refreshTrending = useCallback(
    (storeName, url, pageSize) => {
      dispatch(actions.onRefreshTrending(storeName, url, pageSize))
    },
    [dispatch],
  )
  const loadMoreTrending = useCallback(
    (storeName, url, pageSize, items, callback) => {
      dispatch(
        actions.onLoadMoreTrending(storeName, url, pageSize, items, callback),
      )
    },
    [dispatch],
  )

  // 创建datas
  const createStore = () => {
    let store = Trending[storeName]
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
      <TrendingItem
        projectModel={item}
        onSelect={(callback) => {
          goPage(
            {
              projectModel: item,
              type: ACTION_TYPES.TRENDING,
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
    return URL + key + '?' + timeSpan.searchText
  }
  // 加载数据
  const loadData = (loadMore) => {
    const store = createStore()
    const url = genFetchUrl(storeName)
    if (loadMore) {
      loadMoreTrending(
        storeName,
        ++store.pageIndex,
        PAGESIZE,
        store.items,
        (callback) => {
          toastRef.current.show('no more')
        },
      )
    } else {
      refreshTrending(storeName, url, PAGESIZE)
    }
  }

  const favoriteChangeListener = () => {
    isFavoriteChanged = true
  }

  const bottomTabSelectListener = (data) => {
    if (data.to === 1 && isFavoriteChanged) {
      loadData()
    }
  }

  useEffect(() => {
    loadData()
    const timeSpanChangeListener = DeviceEventEmitter.addListener(
      EVENT_TYPE_TIME_SPAN_CHANGE,
      (event_timeSpan) => {
        timeSpan = event_timeSpan
        loadData()
      },
    )
    EventBus.getInstance().addListener(
      EventTypes.FAVORITE_CHANGE_TRENDING,
      favoriteChangeListener,
    )
    EventBus.getInstance().addListener(
      EventTypes.BOTTOM_TAB_SELECT,
      bottomTabSelectListener,
    )
    return () => {
      timeSpanChangeListener?.remove()
      EventBus.getInstance().removeListener(favoriteChangeListener)
      EventBus.getInstance().removeListener(bottomTabSelectListener)
    }
  }, [])

  return (
    <View>
      <FlatList
        data={createStore().projectModes}
        renderItem={(data) => renderItem(data)}
        keyExtractor={(item) => `${item.item.id || item.item.fullName}`}
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

const TrendingPage = (props): React$Node => {
  const language = useSelector((state) => state.language)
  const [tabNames, setTabNames] = useState(language.languages)
  const [visible, setVisible] = useState(false)
  const [timeSpan, setTimeSpan] = useState(TimeSpans[0])
  const buttonRef = useRef(null)
  const dispatch = useDispatch()
  const loadLanguage = useCallback(() => {
    dispatch(actions.onLoadLanguage(FLAG_LANGUAGE.FLAG_LANGUAGE))
  }, [dispatch])

  useEffect(() => {
    console.log(language)
    setTabNames(language.languages)
  }, [language])

  useEffect(() => {
    loadLanguage()
  }, [])

  const onShow = () => setVisible(true)

  const dismiss = () => setVisible(false)

  const TabNavigator = useMemo(() => {
    const tabs = {}
    tabNames.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: (props) => (
            <TrendingTab {...props} timeSpan={timeSpan} tabLabel={item.name} />
          ),
          navigationOptions: {
            title: item.name === '' ? 'All Language' : item.name,
          },
        }
      }
    })
    console.log(tabs)
    return language.languages.length > 0
      ? createAppContainer(
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
      : null
  }, [tabNames])

  const statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  }

  const onSelectTimeSpan = (tab) => {
    dismiss()
    setTimeSpan(tab)
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
  }

  const renderTrendingDialog = () => {
    return (
      <TrendingDialog
        visible={visible}
        onSelect={(tab) => onSelectTimeSpan(tab)}
        dismiss={dismiss}
      />
    )
  }

  const renderTitleView = () => {
    return (
      <View>
        <TouchableOpacity
          ref={buttonRef}
          underlayColor={'transparent'}
          onPress={() => onShow()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFF',
                fontWeight: '400',
              }}>
              趋势{timeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{ color: 'white' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  const navigationBar = (
    <NavigationBar
      title={renderTitleView()}
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR }}
    />
  )

  return (
    <View style={styles.container}>
      {navigationBar}
      {TabNavigator && <TabNavigator />}
      {renderTrendingDialog()}
    </View>
  )
}

export default TrendingPage
