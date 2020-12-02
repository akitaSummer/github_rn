import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import AsyncStorageDemoPage from '../pages/AsyncStorageDemoPage'
import FetchDemoPage from '../pages/FetchDemoPage'
import DataStoreDemoPage from '../pages/DataStoreDemoPage'
import WebViewPage from '../pages/WebViewPage'
import AboutPage from '../pages/AboutPage'
import AboutMePage from '../pages/AboutMePage'
import CustomKeyPage from '../pages/CustomKeyPage'
import SortKeyPage from '../pages/SortKeyPage'
import SearchPage from '../pages/SearchPage'

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null,
    },
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
    navigationOptions: {
      header: null,
    },
  },
  AsyncStorageDemoPage: {
    screen: AsyncStorageDemoPage,
    navigationOptions: {
      header: null,
    },
  },
  DataStoreDemoPage: {
    screen: DataStoreDemoPage,
    navigationOptions: {
      header: null,
    },
  },
  WebViewPage: {
    screen: WebViewPage,
    navigationOptions: {
      header: null,
    },
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null,
    },
  },
  AboutMePage: {
    screen: AboutMePage,
    navigationOptions: {
      header: null,
    },
  },
  CustomKeyPage: {
    screen: CustomKeyPage,
    navigationOptions: {
      header: null,
    },
  },
  SortKeyPage: {
    screen: SortKeyPage,
    navigationOptions: {
      header: null,
    },
  },
  SearchPage: {
    screen: SearchPage,
    navigationOptions: {
      header: null,
    },
  },
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: {
        screen: InitNavigator,
      },
      Main: {
        screen: MainNavigator,
      },
    },
    {
      navigationOptions: {
        header: null,
      },
    },
  ),
)
