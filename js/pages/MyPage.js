/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { goPage } from '../navigator/NavigationUtil'
import NavigationBar from '../components/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { MORE_MENU } from '../utils/menuUtils'
import GlobalStyles from '../res/globalStyles'
import MenuItem from '../components/MenuItem'
import { FLAG_LANGUAGE } from '../utils/languageUtils'
import actions from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

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

const MyPage = (props): React$Node => {
  const { theme } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const showCustomThemeView = useCallback(
    (show) => {
      dispatch(actions.onShowCustomThemeView(show))
    },
    [dispatch],
  )

  const getRightButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ padding: 5, marginRight: 8 }}>
            <Feather name={'search'} size={24} style={{ color: 'white' }} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const getLeftButton = (callback) => {
    return (
      <TouchableOpacity
        style={{ padding: 8, paddingLeft: 12 }}
        onPress={callback}>
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{ color: 'white' }}
        />
      </TouchableOpacity>
    )
  }

  const statusBar = {
    backgroundColor: theme.styles.navBar,
    barStyle: 'light-content',
  }

  const navigationBar = (
    <NavigationBar
      title={'MyPage'}
      statusBar={statusBar}
      style={{ backgroundColor: theme.themeColor }}
      rightButton={getRightButton()}
      leftButton={getLeftButton()}
    />
  )

  const onClick = (menu) => {
    let RouteName
    const params = {}
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage'
        params.title = '教程'
        params.url = 'https://github.com/akitaSummer/github_rn'
        break
      case MORE_MENU.About:
        RouteName = 'AboutPage'
        break
      case MORE_MENU.CustomTheme:
        showCustomThemeView(true)
        break
      case MORE_MENU.AboutAuthor:
        RouteName = 'AboutMePage'
        break
      case MORE_MENU.CustomKey:
      case MORE_MENU.CustomLanguage:
      case MORE_MENU.RemoveKey:
        RouteName = 'CustomKeyPage'
        params.isRemoveKey = menu === MORE_MENU.RemoveKey
        params.flag =
          menu !== MORE_MENU.CustomLanguage
            ? FLAG_LANGUAGE.FLAG_KEY
            : FLAG_LANGUAGE.FLAG_LANGUAGE
        break
      case MORE_MENU.SortKey:
        RouteName = 'SortKeyPage'
        params.flag = FLAG_LANGUAGE.FLAG_KEY
        break
      case MORE_MENU.SortLanguage:
        RouteName = 'SortKeyPage'
        params.flag = FLAG_LANGUAGE.FLAG_LANGUAGE
        break
    }
    if (RouteName) {
      goPage(params, RouteName)
    }
  }

  return (
    <View style={GlobalStyles.rootContainer}>
      {navigationBar}
      <ScrollView>
        <TouchableOpacity
          style={styles.item}
          onPress={() => onClick(MORE_MENU.About)}>
          <View style={styles.aboutLeft}>
            <Ionicons
              name={MORE_MENU.About.icon}
              size={40}
              style={{
                marginRight: 10,
                color: theme.themeColor,
              }}
            />
            <Text>GitHub Popular</Text>
          </View>
          <Ionicons
            name={'ios-arrow-forward'}
            size={16}
            style={{
              marginRight: 10,
              alignItems: 'center',
              color: theme.themeColor,
            }}
          />
        </TouchableOpacity>
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.Tutorial)}
          menu={MORE_MENU.Tutorial}
          color={theme.themeColor}
        />
        <Text style={styles.groupTitle}>趋势管理</Text>
        <MenuItem
          callback={() => onClick(MORE_MENU.CustomLanguage)}
          menu={MORE_MENU.CustomLanguage}
          color={theme.themeColor}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.SortLanguage)}
          menu={MORE_MENU.SortLanguage}
          color={theme.themeColor}
        />
        <Text style={styles.groupTitle}>最热管理</Text>
        <MenuItem
          callback={() => onClick(MORE_MENU.CustomKey)}
          menu={MORE_MENU.CustomKey}
          color={theme.themeColor}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.SortKey)}
          menu={MORE_MENU.SortKey}
          color={theme.themeColor}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.RemoveKey)}
          menu={MORE_MENU.RemoveKey}
          color={theme.themeColor}
        />
        <Text style={styles.groupTitle}>设置</Text>
        <MenuItem
          callback={() => onClick(MORE_MENU.CustomTheme)}
          menu={MORE_MENU.CustomTheme}
          color={theme.themeColor}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.About)}
          menu={MORE_MENU.About}
          color={theme.themeColor}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.AboutAuthor)}
          menu={MORE_MENU.AboutAuthor}
          color={theme.themeColor}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.Feedback)}
          menu={MORE_MENU.Feedback}
          color={theme.themeColor}
        />
      </ScrollView>
    </View>
  )
}

export default MyPage
