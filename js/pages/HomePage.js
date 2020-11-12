/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useMemo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PopularPage from './PopularPage'
import TrendingPage from './TrendingPage'
import MyPage from './MyPage'
import FavoritePage from './FavoritePage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
})

const Tab = createAppContainer(
  createBottomTabNavigator({
    PopularPage: {
      screen: PopularPage,
      navigationOptions: {
        tabBarLabel: '最热',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <MaterialIcons
              name={'whatshot'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        },
      },
    },
    TrendingPage: {
      screen: TrendingPage,
      navigationOptions: {
        tabBarLabel: '趋势',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={'md-trending-up'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        },
      },
    },
    FavoritePage: {
      screen: FavoritePage,
      navigationOptions: {
        tabBarLabel: '收藏',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <MaterialIcons
              name={'favorite'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        },
      },
    },
    MyPage: {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor, focused }) => {
          return <Entypo name={'user'} size={26} style={{ color: tintColor }} />
        },
      },
    },
  }),
)

const HomePage = (): React$Node => {
  return <Tab />
}

export default HomePage
