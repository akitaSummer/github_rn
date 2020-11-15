/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux'
import { onThemeChange } from '../store/actions/theme'

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

const TrendingPage = (): React$Node => {
  const dispatch = useDispatch()

  const updateTheme = useCallback(() => {
    dispatch(onThemeChange('blue'))
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>TrendingPage</Text>
      <Button title={'blue'} onPress={() => updateTheme()} />
    </View>
  )
}

export default TrendingPage
