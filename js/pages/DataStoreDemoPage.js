/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { fetchData } from '../utils/dataStoreUtils'

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

const DataStoreDemoPage = (): React$Node => {
  const [showText, setShowText] = useState('')

  let value = ''

  const loadData = async () => {
    const url = `https://api.github.com/search/repositories?q=${value}`
    try {
      const data = await fetchData(url)
      const showData = `${new Date(data.timestamp)}\n${JSON.stringify(
        data.data,
      )}`
      setShowText(showData)
    } catch (e) {
      e && console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DataStoreDemoPage</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          value = text
        }}
      />
      <View style={styles.input_container}>
        <Button
          title={'loadData'}
          onPress={() => {
            loadData()
          }}
        />
      </View>

      <Text>{showText}</Text>
    </View>
  )
}

export default DataStoreDemoPage
