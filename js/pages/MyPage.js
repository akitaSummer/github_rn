/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { onThemeChange } from '../store/actions/theme'
import { goPage } from '../navigator/NavigationUtil'
import NavigationBar from '../components/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const THEME_COLOR = '#678'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
})

const MyPage = (): React$Node => {
  const dispatch = useDispatch()

  const updateTheme = useCallback(() => {
    dispatch(onThemeChange('red'))
  }, [dispatch])

  const getRightButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ padding: 5, marginRight: 8 }}>
            <Feather name={'search'} size={24} style={{ color: 'white' }} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const getLeftButton = (callback) => {
    return (
      <TouchableOpacity
        style={{ padding: 8, paddingLeft: 12 }}
        onPress={callback}>
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{ color: 'white' }}
        />
      </TouchableOpacity>
    )
  }

  const statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  }

  const navigationBar = (
    <NavigationBar
      title={'MyPage'}
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR }}
      rightButton={getRightButton()}
      leftButton={getLeftButton()}
    />
  )

  return (
    <View style={styles.container}>
      {navigationBar}
      <Text style={styles.welcome}>MyPage</Text>
    </View>
  )
}

export default MyPage
