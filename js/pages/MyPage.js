/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { onThemeChange } from '../store/actions/theme'
import { goPage } from '../navigator/NavigationUtil'

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

const MyPage = (): React$Node => {
  const dispatch = useDispatch()

  const updateTheme = useCallback(() => {
    dispatch(onThemeChange('red'))
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>MyPage</Text>
      <Button title={'red'} onPress={() => updateTheme()} />
      <Button
        title={'Detail'}
        onPress={() => {
          goPage({}, 'DetailPage')
        }}
      />
      <Button
        title={'Fetch'}
        onPress={() => {
          goPage({}, 'FetchDemoPage')
        }}
      />
      <Button
        title={'AsyncStorage'}
        onPress={() => {
          goPage({}, 'AsyncStorageDemoPage')
        }}
      />
      <Button
        title={'DataStore'}
        onPress={() => {
          goPage({}, 'DataStoreDemoPage')
        }}
      />
    </View>
  )
}

export default MyPage
