/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, DeviceInfo } from 'react-native'
import WebView from 'react-native-webview'
import NavigationBar from '../components/NavigationBar'
import { getLeftBackButton, getShareButton } from '../utils/viewUtils'
import useBackPress from '../hooks/useBackPress'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0,
  },
})

const TRENDING_URL = 'https://github.com/'

const WebViewPage = (props): React$Node => {
  const { navigation } = props
  const { theme } = useSelector((state) => state.theme)
  const { title: propsTitle, url: propsUrl } = navigation.state.params

  const [url, setUrl] = useState(propsUrl)
  const [title, setTitle] = useState(propsTitle)
  const [canGoBack, setCanGoBack] = useState(false)
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

  const navigationBar = () => {
    const titleLayoutStyle = title.length > 20 ? { paddingRight: 30 } : null
    return (
      <NavigationBar
        leftButton={getLeftBackButton(() => onBackFunc())}
        title={title}
        style={{ backgroundColor: theme.themeColor }}
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

export default WebViewPage
