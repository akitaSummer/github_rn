/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { goPage } from '../navigator/NavigationUtil'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
})

const PopularTab = (props) => {
  return (
    <View>
      <Text style={styles.welcome}>PopularTab</Text>
      <Text
        onPress={() => {
          goPage({}, 'DetailPage')
        }}>
        go to detail
      </Text>
    </View>
  )
}

const PopularPage = (props): React$Node => {
  const [tabNames, setTabNames] = useState([
    'Java',
    'Android',
    'ios',
    'React Native',
  ])

  const TabNavigator = (() => {
    const tabs = {}
    tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: (props) => <PopularTab {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      }
    })

    return createAppContainer(
      createMaterialTopTabNavigator(tabs, {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: '#a67',
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      }),
    )
  })()

  return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  )
}

export default PopularPage
