/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react'
import { StyleSheet, View, Linking } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import AboutCommon from '../components/AboutCommon'
import { goPage } from '../navigator/NavigationUtil'
import GlobalStyles from '../res/globalStyles'
import MenuItem from '../components/MenuItem'
import { FLAG_ABOUT } from '../components/AboutCommon'
import config from '../res/data/config.json'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-easy-toast'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  aboutLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
})

const AboutMePage = (props): React$Node => {
  const { navigation } = props
  const { params } = navigation.state
  const { theme } = useSelector((state) => state.theme)
  const [data, setData] = useState(config)
  const [showBlog, setShowBlog] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showQQ, setShowQQ] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const toast = useRef(null)

  const onClick = (tab) => {
    if (!tab) return
    if (tab.url) {
      goPage({ title: tab.title, url: tab.url }, 'WebViewPage')
    } else if (tab.account?.indexOf('@')) {
      const url = 'mailto://' + tab.account
      Linking.canOpenURL(url)
        .then((support) => {
          if (!support) {
            console.log("Can't handle url: " + url)
          } else {
            Linking.openURL(url)
          }
        })
        .catch((e) => {
          console.error(e)
        })
    } else if (tab.account) {
      Clipboard.setString(tab.account)
      toast.show(tab.title + tab.account + '已复制到剪切板')
    }
  }

  const renderItems = (dic, isShowAccount) => {
    if (!dic) return
    const views = []
    for (let i in dic) {
      const title = isShowAccount
        ? dic[i].title + ':' + dic[i].account
        : dic[i].title
      views.push(
        <View key={i}>
          <MenuItem
            callback={() => onClick(dic[i])}
            menu={{ text: title }}
            color={theme.themeColor}
          />
          <View style={GlobalStyles.line} />
        </View>,
      )
    }
    return views
  }

  return (
    <View style={GlobalStyles.rootContainer}>
      <AboutCommon
        navigation={navigation}
        updateState={(data) => setData({ ...data })}
        flagAbout={FLAG_ABOUT.FLAG_ABOUT_ME}
        params={params}
        data={data.author}>
        <MenuItem
          callback={() => {
            setShowTutorial(!showTutorial)
          }}
          menu={{
            ...data.aboutMe.Tutorial,
            text: data.aboutMe.Tutorial.name,
            Icons: Ionicons,
          }}
          color={theme.themeColor}
          expandableIco={showTutorial ? 'ios-arrow-up' : 'ios-arrow-down'}
        />
        <View style={GlobalStyles.line} />
        {showTutorial ? renderItems(data.aboutMe.Tutorial.items) : null}
        <MenuItem
          callback={() => {
            setShowBlog(!showBlog)
          }}
          menu={{
            ...data.aboutMe.Blog,
            text: data.aboutMe.Blog.name,
            Icons: Ionicons,
          }}
          color={theme.themeColor}
          expandableIco={showBlog ? 'ios-arrow-up' : 'ios-arrow-down'}
        />
        <View style={GlobalStyles.line} />
        {showBlog ? renderItems(data.aboutMe.Blog.items) : null}
        <MenuItem
          callback={() => {
            setShowQQ(!showQQ)
          }}
          menu={{
            ...data.aboutMe.QQ,
            text: data.aboutMe.QQ.name,
            Icons: Ionicons,
          }}
          color={theme.themeColor}
          expandableIco={showQQ ? 'ios-arrow-up' : 'ios-arrow-down'}
        />
        <View style={GlobalStyles.line} />
        {showQQ ? renderItems(data.aboutMe.QQ.items) : null}
        <MenuItem
          callback={() => {
            setShowContact(!showContact)
          }}
          menu={{
            ...data.aboutMe.Contact,
            text: data.aboutMe.Contact.name,
            Icons: Ionicons,
          }}
          color={theme.themeColor}
          expandableIco={showContact ? 'ios-arrow-up' : 'ios-arrow-down'}
        />
        <View style={GlobalStyles.line} />
        {showContact ? renderItems(data.aboutMe.Contact.items) : null}
      </AboutCommon>
      <View>
        <Toast ref={toast} position={'center'} />
      </View>
    </View>
  )
}

export default AboutMePage
