/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'

const styles = StyleSheet.create({
  input: {
    height: 30,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
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

const FetchDemoPage = (): React => {
  const [showText, setShowText] = useState('')

  let searchKey = ''
  const loadData = async () => {
    let url = `https://api.github.com/search/repositories?q=${searchKey}`
    console.log(url)
    try {
      const result = await fetch(url)
      if (result.ok) {
        const resultText = await result.text()
        setShowText(resultText)
      } else {
        throw new Error('Network response was not ok.')
      }
    } catch (e) {
      setShowText(e.toString())
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FetchDemoPage</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            searchKey = text
          }}
        />
        <Button
          title={'获取'}
          onPress={() => {
            loadData()
          }}
        />
      </View>

      <Text>{showText}</Text>
    </View>
  )
}

export default FetchDemoPage
