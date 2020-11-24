import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  settingItemContainer: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})

const MenuItem = (props) => {
  const { callback, menu, color, expandableIco } = props
  const { text, Icons, icon } = menu
  return (
    <TouchableOpacity onPress={callback} style={styles.settingItemContainer}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        {Icons && icon ? (
          <Icons
            name={icon}
            size={16}
            style={{
              color,
              marginRight: 10,
            }}
          />
        ) : null}
        <Text>{text}</Text>
      </View>
      <Ionicons
        name={expandableIco ? expandableIco : 'ios-arrow-forward'}
        size={16}
        style={{
          marginRight: 10,
          alignItems: 'center',
          color: color || 'black',
        }}
      />
    </TouchableOpacity>
  )
}

export default MenuItem
