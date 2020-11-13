/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

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

const FavoritePage = (props): React$Node => {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>FavoritePage</Text>
      <Button
        title={'orange'}
        onPress={() =>
          navigation.setParams({
            theme: {
              tintColor: 'red',
              updateTime: new Date().getTime(),
            },
          })
        }
      />
    </View>
  )
}

export default FavoritePage
