import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator } from 'react-navigation'
import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'

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
  },
})

export default createSwitchNavigator(
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
)