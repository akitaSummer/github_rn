/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  DeviceInfo,
  Alert,
  Text,
  Animated,
} from 'react-native'
import { getRightButton, getLeftBackButton } from '../utils/viewUtils'
import { useSelector, useDispatch } from 'react-redux'
import NavigationBar from '../components/NavigationBar'
import actions from '../store/actions'
import { FLAG_LANGUAGE, languageSave } from '../utils/languageUtils'
import useBackPress from '../hooks/useBackPress'
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { updateArray, remove, isEqual } from '../utils/arrayUtils'
import SortableList from 'react-native-sortable-list'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isIphoneX_deprecated ? 30 : 0,
  },
  item: {
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 50,
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  hidden: {
    height: 0,
  },
})

const SortKeyPage = (props): React$Node => {
  const { theme } = useSelector((state) => state.theme)
  const { navigation } = props
  const { params } = navigation.state
  const language = useSelector((state) => state.language)
  const [keys, setKeys] = useState(language[params.keys])
  const dispatch = useDispatch()
  const loadLanguage = useCallback(() => {
    dispatch(actions.onLoadLanguage(params.flag))
  }, [dispatch])

  const title =
    params.flag === FLAG_LANGUAGE.FLAG_LANGUAGE ? '语音排序' : '标签排序'

  useEffect(() => {
    setKeys(language.keys)
  }, [language])

  const getKeys = (props) => {
    if (checkedArray?.length > 0) {
      return checkedArray
    }
    const flag = getFlag(props)
    const dataArray = language[flag] || []
    const keys = []
    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i]
      if (data.checked) keys.push(data)
    }
    return keys
  }

  const getFlag = (props) => {
    const { flag } = props.navigation.state.params
    return flag === FLAG_LANGUAGE.FLAG_KEY ? 'keys' : 'languages'
  }

  const [checkedArray, setCheckArray] = useState(getKeys(props))

  useEffect(() => {
    if (getKeys(props).length === 0) {
      loadLanguage(params.flag)
    }
    setKeys(getKeys(props))
  }, [])

  const onBackFunc = () => {
    if (!isEqual(getKeys(props), checkedArray)) {
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
    backgroundColor: theme.themeColor,
    barStyle: 'light-content',
  }

  const onSave = (hasChecked) => {
    if (!hasChecked) {
      if (isEqual(getKeys(props), checkedArray)) {
        navigation.goBack()
        return
      }
    }
    languageSave(params.flag, getSortResult())
    loadLanguage(params.flag)
    navigation.goBack()
  }

  const getSortResult = () => {
    const flag = getFlag(props)
    const sortResultArray = [...language[flag]]
    const originalCheckedArray = getKeys(props)
    for (let i = 0; i < originalCheckedArray.length; i++) {
      const item = originalCheckedArray[i]
      const index = language[flag].indexOf(item)
      sortResultArray.splice(index, i, checkedArray)
    }
    return sortResultArray
  }

  const navigationBar = (
    <NavigationBar
      title={title}
      statusBar={statusBar}
      rightButton={getRightButton('保存', () => {
        onSave()
      })}
      leftButton={getLeftBackButton(() => onBackFunc())}
      style={{ backgroundColor: theme.themeColor }}
    />
  )

  return (
    <View style={styles.container}>
      {navigationBar}
      <SortableList
        data={checkedArray}
        // order={Object.keys(checkedArray)}
        style={{ flex: 1 }}
        // onRowMoved={(e) => {
        //   checkedArray.splice(e.to, 0, checkedArray.splice(e.from, 1)[0])
        //   // forceUpdate()
        // }}
        renderRow={({ data }) => <SortCell data={data} {...params} />}
      />
    </View>
  )
}

const SortCell = (props) => {
  return (
    <Animated.View
      underlayColor={'#eee'}
      style={props.data.checked ? styles.item : styles.hidden}
      {...props.sortHandlers}>
      <View style={{ marginLeft: 10, flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name={'sort'}
          size={16}
          style={{ marginRight: 10, color: theme.themeColor }}
        />
        <Text>{props.data.name}</Text>
      </View>
    </Animated.View>
  )
}

export default SortKeyPage
