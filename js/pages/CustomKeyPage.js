/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { StyleSheet, View, ScrollView, DeviceInfo, Alert } from 'react-native'
import { getRightButton, getLeftBackButton } from '../utils/viewUtils'
import { useSelector, useDispatch } from 'react-redux'
import NavigationBar from '../components/NavigationBar'
import actions from '../store/actions'
import { FLAG_LANGUAGE, languageSave } from '../utils/languageUtils'
import useBackPress from '../hooks/useBackPress'
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { updateArray, remove } from '../utils/arrayUtils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0,
  },
  item: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
})

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
const PAGESIZE = 10

const CustomKeyPage = (props): React$Node => {
  const { navigation } = props
  const { params } = navigation.state
  const [changeValues, setChangeValues] = useState([])
  const isRemoveKey = !!params.isRemoveKey

  const language = useSelector((state) => state.language)
  const [keys, setKeys] = useState(language[params.keys])
  const dispatch = useDispatch()
  const loadLanguage = useCallback(() => {
    dispatch(actions.onLoadLanguage(params.flag))
  }, [dispatch])

  const title =
    params.flag === FLAG_LANGUAGE.FLAG_LANGUAGE
      ? '自定义语言'
      : isRemoveKey
      ? '标签移除'
      : '自定义标签'

  const rightButtonTitle = isRemoveKey ? '移除' : '保存'

  useEffect(() => {
    setKeys(language.keys)
  }, [language])

  const getKeys = (props, original, state) => {
    const { flag, isRemoveKey } = props.navigation.state.params
    const key = flag === FLAG_LANGUAGE.FLAG_KEY ? 'keys' : 'languages'
    if (isRemoveKey && !original) {
      return (
        (keys && keys.length !== 0 && state.keys) ||
        language[key].map((val) => {
          return {
            ...val,
            checked: false,
          }
        })
      )
    } else {
      return language[key]
    }
  }

  useEffect(() => {
    if (getKeys(props).length === 0) {
      loadLanguage(params.flag)
    }
    setKeys(getKeys(props))
  }, [])

  const onBackFunc = () => {
    if (changeValues.length > 0) {
      Alert.alert('提示', '要保存修改吗？', [
        {
          text: '否',
          onPress: () => {
            navigation.goBack()
          },
        },
        {
          text: '是',
          onPress: () => {
            onSave()
          },
        },
      ])
    } else {
      navigation.goBack()
    }
  }

  useBackPress(() => {
    onBackFunc()
    return true
  })

  const statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  }

  const onSave = () => {
    if (changeValues.length === 0) {
      navigation.goBack()
      return
    }
    let newKeys
    if (isRemoveKey) {
      const newChangeValues = [...changeValues]
      for (let i = 0; i < newChangeValues.length; i++) {
        remove((newKeys = getKeys(props, true)), newChangeValues, 'name')
      }
    }
    languageSave(params.flag, newKeys || keys)
    loadLanguage(params.flag)
    navigation.goBack()
  }

  const renderView = () => {
    if (!keys || keys.length === 0) return
    const views = []
    for (let i = 0; i < keys.length; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {renderCheckBox(keys[i], i)}
            {i + 1 < keys.length && renderCheckBox(keys[i + 1], i + 1)}
          </View>
          <View style={styles.line} />
        </View>,
      )
    }
    return views
  }

  const renderCheckBox = (data, index) => (
    <CheckBox
      style={{ flex: 1, padding: 10 }}
      onClick={() => onClick(data, index)}
      isChecked={data.checked}
      leftText={data.name === '' ? 'All' : data.name}
      checkedImage={checkImage(true)}
      uncheckedImage={checkImage(false)}
    />
  )

  const onClick = (data, index) => {
    data.checked = !data.checked
    const newChangeValues = [...changeValues]
    updateArray(newChangeValues, data)
    setChangeValues(newChangeValues)
    const newKeys = [...keys]
    newKeys[index] = data
    setKeys(newKeys)
  }

  const checkImage = (checked) => {
    const { theme } = params
    return (
      <Ionicons
        name={checked ? 'ios-checkbox' : 'md-square-outline'}
        size={20}
        style={{
          color: THEME_COLOR,
        }}
      />
    )
  }

  const navigationBar = (
    <NavigationBar
      title={title}
      statusBar={statusBar}
      rightButton={getRightButton(rightButtonTitle, () => {
        onSave()
      })}
      leftButton={getLeftBackButton(() => onBackFunc())}
      style={{ backgroundColor: THEME_COLOR }}
    />
  )

  return (
    <View style={styles.container}>
      {navigationBar}
      <ScrollView>{renderView()}</ScrollView>
    </View>
  )
}

export default CustomKeyPage
