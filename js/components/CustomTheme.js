import React, { useCallback, useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  DeviceInfo,
  ScrollView,
  Platform,
} from 'react-native'
import { saveTheme } from '../utils/themeUtils'
import ThemeFactory, { ThemeFlags } from '../res/themeFactory'
import GlobalStyles from '../res/globalStyles'
import { useDispatch } from 'react-redux'
import actions from '../store/actions'

const styles = StyleSheet.create({
  themeItem: {
    flex: 1,
    height: 120,
    margin: 3,
    padding: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
    marginTop:
      Platform.OS === 'ios'
        ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0)
        : 10,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    padding: 3,
  },
  themeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
})

const CustomTheme = (props) => {
  const { onClose, onSelect, visible, dismiss } = props
  const dispatch = useDispatch()
  const themeChange = useCallback(
    (theme) => {
      dispatch(actions.onThemeChange(theme))
    },
    [dispatch],
  )

  const onSelectTheme = (themeKey) => {
    onClose()
    saveTheme(ThemeFlags[themeKey])
    themeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]))
  }

  const getThemeItem = (themeKey) => {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        underlayColor="white"
        onPress={() => onSelectTheme(themeKey)}>
        <View
          style={[{ backgroundColor: ThemeFlags[themeKey] }, styles.themeItem]}>
          <Text style={styles.themeText}>{themeKey}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  const renderThemeItems = () => {
    const views = []
    for (
      let i = 0, keys = Object.keys(ThemeFlags), l = keys.length;
      i < l;
      i += 3
    ) {
      const key1 = keys[i],
        key2 = keys[i + 1],
        key3 = keys[i + 2]
      views.push(
        <View key={i} style={{ flexDirection: 'row' }}>
          {getThemeItem(key1)}
          {getThemeItem(key2)}
          {getThemeItem(key3)}
        </View>,
      )
    }
    return views
  }

  const renderContentView = () => {
    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onClose()
        }}>
        <View style={styles.modalContainer}>
          <ScrollView>{renderThemeItems()}</ScrollView>
        </View>
      </Modal>
    )
  }

  return visible ? (
    <View style={GlobalStyles.root_container}>{renderContentView()}</View>
  ) : null
}

export default CustomTheme
