/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { resetToHomePage } from '../navigator/NavigationUtil'
import SplashScreen from 'react-native-splash-screen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const WelcomePage = (props): React$Node => {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide()
      resetToHomePage(props)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>WelcomePage</Text>
    </View>
  )
}

export default WelcomePage
