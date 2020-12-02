/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  DeviceInfo,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import NavigationBar from '../components/NavigationBar'
import actions from '../store/actions'
import PopularItem from '../components/PopularItem'
import Toast from 'react-native-easy-toast'
import { goPage } from '../navigator/NavigationUtil'
import { ACTION_TYPES } from '../store/actions/actionUtils'
import { FLAG_LANGUAGE } from '../utils/languageUtils'
import useBackPress from '../hooks/useBackPress'
import { onSearchCancel } from '../store/actions/serach'
import GlobalStyles from '../res/globalStyles'
import { languageSave } from '../utils/languageUtils'
import { getLeftBackButton } from '../utils/viewUtils'
import { checkKeyIsExist } from '../utils/favoriteUtils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
  statusBar: {
    height: 20,
  },
  bottomButton: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    height: 40,
    position: 'absolute',
    left: 10,
    top:
      GlobalStyles.windowHeight -
      45 -
      (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
    right: 10,
    borderRadius: 3,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {
    flex: 1,
    height: Platform.OS === 'ios' ? 26 : 36,
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: 'white',
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 3,
    opacity: 0.7,
    color: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
})

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const PAGESIZE = 10

const SearchPage = (props): React$Node => {
  const { navigation } = props
  const [isKeyChange, setIsKeyChange] = useState(false)
  const [searchToken, setSearchToken] = useState(Date.now())
  const { theme } = useSelector((state) => state.theme)
  const language = useSelector((state) => state.language)
  const search = useSelector((state) => state.search)
  let {
    isLoading,
    projectModels,
    showBottomButton,
    hideLoadingMore,
    showText,
    inputKey,
  } = search
  const [tabNames, setTabNames] = useState([...language.keys])
  const toastRef = useRef(null)
  const inputRef = useRef(null)
  let canLoadMore
  const dispatch = useDispatch()
  const loadLanguage = useCallback(() => {
    dispatch(actions.onLoadLanguage(FLAG_LANGUAGE.FLAG_KEY))
  }, [dispatch])
  const searchCancel = useCallback(
    (searchToken) => {
      dispatch(actions.onSearchCancel(searchToken))
    },
    [dispatch],
  )
  const onSearch = useCallback(
    (inputKey, pageSize, token, type, popularKeys, callBack) => {
      dispatch(
        actions.onSearch(
          inputKey,
          pageSize,
          token,
          type,
          popularKeys,
          callBack,
        ),
      )
    },
    [dispatch],
  )

  const loadMoreSearch = useCallback(
    (pageIndex, pageSize, dataArray = [], type, callBack) => {
      dispatch(
        actions.onLoadMoreSearch(
          pageIndex,
          pageSize,
          (dataArray = []),
          type,
          callBack,
        ),
      )
    },
    [dispatch],
  )

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

  const onRightButtonClick = () => {
    if (search.showText === '搜索') {
      loadData()
    } else {
      searchCancel(searchToken)
    }
  }

  const renderNavBar = () => {
    const placeholder = inputKey || '请输入'
    let backButton = getLeftBackButton(() => onBackFunc())
    let inputView = (
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        onChangeText={(text) => (inputKey = text)}
        style={styles.textInput}
      />
    )
    let rightButton = (
      <TouchableOpacity
        onPress={() => {
          inputRef.current.blur() //收起键盘
          onRightButtonClick()
        }}>
        <View style={{ marginRight: 10 }}>
          <Text style={styles.title}>{showText}</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <View
        style={{
          backgroundColor: theme.themeColor,
          flexDirection: 'row',
          alignItems: 'center',
          height:
            Platform.OS === 'ios'
              ? GlobalStyles.navBarHeightIOS
              : GlobalStyles.navBarHeightAndroid,
        }}>
        {backButton}
        {inputView}
        {rightButton}
      </View>
    )
  }

  const loadData = (loadMore) => {
    if (loadMore) {
      loadMoreSearch(
        ++search.pageIndex,
        PAGESIZE,
        search.item,
        ACTION_TYPES.POPULAR,
        (callback) => {
          toastRef.current.show('没有更多了')
        },
      )
    } else {
      setSearchToken(Date.now())
      onSearch(
        inputKey,
        PAGESIZE,
        Date.now(),
        ACTION_TYPES.POPULAR,
        tabNames,
        (message) => {
          toastRef.current.show(message)
        },
      )
    }
  }

  const genIndicator = () => {
    return hideLoadingMore ? null : (
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

  const onBackFunc = () => {
    onSearchCancel()
    inputRef.current.blur()
    navigation.goBack()
    if (isKeyChange) {
      loadLanguage()
    }
  }

  const saveKey = () => {
    const { keys } = language
    let key = inputKey
    if (checkKeyIsExist(keys, key)) {
      toastRef.current.show(key + '已经存在')
    } else {
      key = {
        path: key,
        name: key,
        checked: true,
      }
      keys.unshift(key) //将key添加到数组的开头
      languageSave(FLAG_LANGUAGE.FLAG_KEY, keys)
      toastRef.current.show(key.name + '保存成功')
      setIsKeyChange(true)
    }
  }

  useBackPress(() => {
    onBackFunc()
    return true
  })

  useEffect(() => {
    setTabNames([...language.keys])
  }, [language])

  useEffect(() => {
    loadLanguage()
  }, [])

  const statusBar =
    Platform.OS === 'ios' ? (
      <View
        style={[
          styles.statusBar,
          {
            backgroundColor: theme.themeColor,
          },
        ]}
      />
    ) : null
  const listView = isLoading ? null : (
    <FlatList
      data={projectModels}
      renderItem={(data) => renderItem(data)}
      keyExtractor={(item) => `${item.item.id}`}
      contentInset={{
        bottom: 45,
      }}
      refreshControl={
        <RefreshControl
          title={'loading'}
          titleColor={theme.themeColor}
          colors={[theme.themeColor]}
          refreshing={isLoading}
          onRefresh={() => loadData()}
          tintColor={theme.themeColor}
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
  )

  const bottomButton = showBottomButton ? (
    <TouchableOpacity
      style={[
        styles.bottomButton,
        {
          backgroundColor: theme.themeColor,
        },
      ]}
      onPress={() => saveKey()}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>收藏</Text>
      </View>
    </TouchableOpacity>
  ) : null

  const indicatorView = isLoading ? (
    <ActivityIndicator
      style={styles.centering}
      size="large"
      animating={isLoading}
    />
  ) : null

  const resultView = (
    <View>
      {indicatorView}
      {listView}
    </View>
  )

  const navigationBar = (
    <NavigationBar
      title={'hot'}
      statusBar={statusBar}
      style={{ backgroundColor: theme.themeColor }}
    />
  )

  return (
    <View style={styles.container}>
      {statusBar}
      {renderNavBar()}
      {resultView}
      {bottomButton}
      <Toast ref={toastRef} position={'center'} />
    </View>
  )
}

export default SearchPage
