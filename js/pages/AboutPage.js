/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View, Linking } from 'react-native'
import AboutCommon from '../components/AboutCommon'
import { goPage } from '../navigator/NavigationUtil'
import { MORE_MENU } from '../utils/menuUtils'
import GlobalStyles from '../res/globalStyles'
import MenuItem from '../components/MenuItem'
import { FLAG_ABOUT } from '../components/AboutCommon'
import config from '../res/data/config.json'

const THEME_COLOR = '#678'

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

const AboutPage = (props): React$Node => {
  const { navigation } = props
  const { params } = navigation.state
  const [data, setData] = useState(config)

  const onClick = (menu) => {
    let RouteName
    const params = {}
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage'
        params.title = '教程'
        params.url = 'https://github.com/akitaSummer/github_rn'
        break
      case MORE_MENU.AboutAuthor:
        RouteName = 'AboutMePage'
        break
      case MORE_MENU.Feedback:
        const url = 'mailto://644171127@qq.com'
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
        break
    }
    if (RouteName) {
      goPage(params, RouteName)
    }
  }

  return (
    <View style={GlobalStyles.rootContainer}>
      <AboutCommon
        navigation={navigation}
        updateState={(data) => setData({ ...data })}
        flagAbout={FLAG_ABOUT.FLAG_ABOUT}
        params={params}
        data={data.app}>
        <MenuItem
          callback={() => onClick(MORE_MENU.Tutorial)}
          menu={MORE_MENU.Tutorial}
          color={THEME_COLOR}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.AboutAuthor)}
          menu={MORE_MENU.AboutAuthor}
          color={THEME_COLOR}
        />
        <View style={GlobalStyles.line} />
        <MenuItem
          callback={() => onClick(MORE_MENU.Feedback)}
          menu={MORE_MENU.Feedback}
          color={THEME_COLOR}
        />
      </AboutCommon>
    </View>
  )
}

export default AboutPage
