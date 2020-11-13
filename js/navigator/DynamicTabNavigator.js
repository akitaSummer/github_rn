import React, { useState, memo } from 'react'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import PopularPage from '../pages/PopularPage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TrendingPage from '../pages/TrendingPage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FavoritePage from '../pages/FavoritePage'
import MyPage from '../pages/MyPage'
import Entypo from 'react-native-vector-icons/Entypo'

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

const tabBarComponent = (props) => {
  // 设置默认主题
  const [tabBarTheme, setTabBarTheme] = useState({
    tintColor: props.activeTintColor,
    updateTime: new Date().getTime(),
  })

  const { routes, index } = props.navigation.state

  if (routes[index].params) {
    // 如果有主题修改则更新主题
    const { theme } = routes[index].params
    if (theme && theme.updateTime > tabBarTheme.updateTime) {
      setTabBarTheme(theme)
    }
  }

  return (
    <BottomTabBar
      {...props}
      activeTintColor={tabBarTheme.tintColor || props.activeTintColor}
    />
  )
}

const DynamicTabNavigator = () => {
  console.disableYellowBox = true

  const Tab = (() => {
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
    PopularPage.navigationOptions.tabBarLabel = 'hot'
    return createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: memo(tabBarComponent),
      }),
    )
  })()

  return <Tab />
}

export default DynamicTabNavigator
