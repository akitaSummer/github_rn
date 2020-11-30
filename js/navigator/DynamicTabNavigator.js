import React, { useState, useMemo } from 'react'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { connect, useSelector } from 'react-redux'
import PopularPage from '../pages/PopularPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TrendingPage from '../pages/TrendingPage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FavoritePage from '../pages/FavoritePage'
import MyPage from '../pages/MyPage'
import Entypo from 'react-native-vector-icons/Entypo'
import EventBus from 'react-native-event-bus'
import { EventTypes } from '../utils/EventUtils'

const TABS = {
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
}

const DynamicTabNavigator = () => {
  console.disableYellowBox = true

  const Tab = useMemo(() => {
    return (() => {
      const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
      const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
      PopularPage.navigationOptions.tabBarLabel = 'hot'
      return createAppContainer(
        createBottomTabNavigator(tabs, {
          tabBarComponent: (props) => {
            const theme = useSelector((state) => state.theme)
            return (
              <BottomTabBar {...props} activeTintColor={theme.themeColor} />
            )
          },
        }),
      )
    })()
  }, [])

  return (
    <Tab
      onNavigationStateChange={(prevState, newState, action) => {
        EventBus.getInstance().fireEvent(EventTypes.BOTTOM_TAB_SELECT, {
          from: prevState.index,
          to: newState.index,
        })
      }}
    />
  )
}

export default DynamicTabNavigator
