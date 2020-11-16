import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import AsyncStorageDemoPage from '../pages/AsyncStorageDemoPage'
import FetchDemoPage from '../pages/FetchDemoPage'
import DataStoreDemoPage from '../pages/DataStoreDemoPage'

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
