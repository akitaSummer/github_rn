import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HtmlView from 'react-native-htmlview'
import useFavorite from '../hooks/useFavorite'
import { onFavorite } from '../utils/favoriteUtils'
import { ACTION_TYPES } from '../store/actions/actionUtils'
import EventBus from 'react-native-event-bus'
import { EventTypes } from '../utils/EventUtils'

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
  const { projectModel } = props
  const { item } = projectModel
  const [onItemClick, FavoriteButton] = useFavorite(
    projectModel,
    (item, isFavorite) => {
      onFavorite(ACTION_TYPES.TRENDING, item, isFavorite)
      EventBus.getInstance().fireEvent(EventTypes.FAVORITE_CHANGE_TRENDING)
    },
    props.onSelect,
  )
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
    <TouchableOpacity onPress={() => onItemClick()}>
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
          {FavoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TrendingItem
