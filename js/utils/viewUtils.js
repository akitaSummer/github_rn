import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const getLeftBackButton = (callback) => {
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        paddingLeft: 12,
      }}
      onPress={callback}>
      <Ionicons name={'ios-arrow-back'} size={26} style={{ color: 'white' }} />
    </TouchableOpacity>
  )
}

export const getShareButton = (callback) => {
  return (
    <TouchableOpacity underlayColor={'transparent'} onPress={callback}>
      <Ionicons
        name={'md-share'}
        size={20}
        style={{ opacity: 0.9, marginRight: 10, color: 'white' }}
      />
    </TouchableOpacity>
  )
}

export const getRightButton = (title, callback) => {
  return (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={callback}>
      <Text style={{ fontSize: 20, color: '#FFF', marginRight: 10 }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
