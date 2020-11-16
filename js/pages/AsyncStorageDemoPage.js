/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

const KEY = 'SAVE_KEY'

const AsyncStorageDemoPage = (): React => {
  const [showText, setShowText] = useState('')

  let value = ''

  const doSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, value)
    } catch (e) {
      e && console.log(e.toString())
    }
  }

  const getData = async () => {
    try {
      const result = await AsyncStorage.getItem(KEY)
      setShowText(result)
    } catch (e) {
      e && console.log(e.toString())
    }
  }

  const doRemove = async () => {
    try {
      await AsyncStorage.removeItem(KEY)
    } catch (e) {
      e && console.log(e.toString())
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorageDemoPage</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          value = text
        }}
      />
      <View style={styles.input_container}>
        <Button
          title={'Save'}
          onPress={() => {
            doSave()
          }}
        />
        <Button
          title={'Del'}
          onPress={() => {
            doRemove()
          }}
        />
        <Button
          title={'get'}
          onPress={() => {
            getData()
          }}
        />
      </View>

      <Text>{showText}</Text>
    </View>
  )
}

export default AsyncStorageDemoPage
