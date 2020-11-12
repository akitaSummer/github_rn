/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
})

const PopularTab = () => {
  return (
    <View>
      <Text style={styles.welcome}>PopularTab</Text>
    </View>
  )
}

const TabNavigator = createAppContainer(
  createMaterialTopTabNavigator({
    PopularTab1: {
      screen: PopularTab,
      navigationOptions: {
        title: 'Tab1',
      },
    },
    PopularTab2: {
      screen: PopularTab,
      navigationOptions: {
        title: 'Tab2',
      },
    },
  }),
)

const PopularPage = (): React$Node => {
  return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  )
}

export default PopularPage
