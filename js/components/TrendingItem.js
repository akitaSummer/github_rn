import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HtmlView from 'react-native-htmlview'

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
})

const TrendingItem = (props) => {
  const { item } = props
  if (!item) return null
  const favoriteButton = (
    <TouchableOpacity
      style={{ padding: 6 }}
      onPress={() => {}}
      underlayColor={'transparent'}>
      <FontAwesome name={'star-o'} size={16} style={{ color: 'red' }} />
    </TouchableOpacity>
  )
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.cell_container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <Text style={styles.description}>
          <HtmlView
            value={`<p>${item.description}<p>`}
            onLinkPress={(url) => {}}
            stylesheet={{
              p: styles.description,
              a: styles.description,
            }}
          />
        </Text>
        <Text style={styles.description}>{item.meta}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Built by:</Text>
            {item.contributors.map((result, i, arr) => {
              return (
                <Image
                  key={i}
                  style={{ height: 22, width: 22, margin: 2 }}
                  source={{ uri: arr[i] }}
                />
              )
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Start:</Text>
            <Text>{item.starCount}</Text>
          </View>
          {favoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TrendingItem
