/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, DeviceInfo } from 'react-native'
import WebView from 'react-native-webview'
import NavigationBar from '../components/NavigationBar'
import { getLeftBackButton, getShareButton } from '../utils/viewUtils'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import useBackPress from '../hooks/useBackPress'
import { removeFavoriteItem, saveFavoriteItem } from '../utils/favoriteUtils'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0,
  },
})

const TRENDING_URL = 'https://github.com/'

const DetailPage = (props): React$Node => {
  const { navigation } = props
  const { projectModel, type } = navigation.state.params
  const { theme } = useSelector((state) => state.theme)
  const propsUrl =
    projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName

  const propsTitle = projectModel.item.full_name || projectModel.item.fullName

  const [url, setUrl] = useState(propsUrl)
  const [title, setTitle] = useState(propsTitle)
  const [canGoBack, setCanGoBack] = useState(false)
  const [isFavorite, setIsFavorite] = useState(projectModel.isFavorite)
  const webView = useRef(null)

  useEffect(() => {
    setUrl(propsUrl)
    setTitle(propsTitle)
  }, [props])

  const onBackFunc = () => {
    if (canGoBack) {
      webView.goback()
    } else {
      navigation.goBack()
    }
  }

  useBackPress(() => {
    onBackFunc()
    return true
  })

  const onFavoriteButtonClick = () => {
    const { projectModel, callback } = navigation.state.params
    const isFavorite = (projectModel.isFavorite = !projectModel.isFavorite)
    setIsFavorite(isFavorite)
    callback(isFavorite)
    const key = projectModel.item.fullName
      ? projectModel.item.fullName
      : projectModel.item.id.toString()
    if (projectModel.isFavorite) {
      saveFavoriteItem(type, key, JSON.stringify(key))
    } else {
      removeFavoriteItem(type, key)
    }
  }

  const renderRightButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            onFavoriteButtonClick()
          }}>
          <FontAwesome
            name={isFavorite ? 'star' : 'star-o'}
            size={20}
            style={{
              color: 'white',
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        {getShareButton(() => {})}
      </View>
    )
  }

  const navigationBar = () => {
    const titleLayoutStyle = title.length > 20 ? { paddingRight: 30 } : null
    return (
      <NavigationBar
        leftButton={getLeftBackButton(() => onBackFunc())}
        title={title}
        titleLayoutStyle={titleLayoutStyle}
        style={{ backgroundColor: theme.themeColor }}
        rightButton={renderRightButton()}
      />
    )
  }

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack)
    setUrl(navState.url === 'about:blank' ? url : navState.url)
  }

  return (
    <View style={styles.container}>
      {navigationBar()}
      <WebView
        ref={webView}
        startInLoadingState={true}
        onNavigationStateChange={(e) => onNavigationStateChange(e)}
        source={{ uri: url }}
      />
    </View>
  )
}

export default DetailPage
