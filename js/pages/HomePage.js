/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import { HomePageNavigation } from '../navigator/NavigationUtil'

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

const HomePage = (props): React$Node => {
  HomePageNavigation.setNavigation(props.navigation)

  return <DynamicTabNavigator />
}

export default HomePage
