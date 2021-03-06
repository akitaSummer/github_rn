/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import { HomePageNavigation } from '../navigator/NavigationUtil'
import CustomTheme from '../components/CustomTheme'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../store/actions'
import SafeAreaViewPlus from '../components/SafeAreaViewPlus'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
})

const HomePage = (props) => {
  const { theme } = useSelector((state) => state.theme)
  const { customThemeViewVisible } = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const showCustomThemeView = useCallback(
    (show) => {
      dispatch(actions.onShowCustomThemeView(show))
    },
    [dispatch],
  )

  useEffect(() => {
    HomePageNavigation.setNavigation(props.navigation)
  }, [props])

  const renderCustomThemeView = () => {
    return (
      <CustomTheme
        visible={customThemeViewVisible}
        onClose={() => showCustomThemeView(false)}
        {...props}
      />
    )
  }

  return (
    <SafeAreaViewPlus style={{ flex: 1 }} topColor={theme.themeColor}>
      <DynamicTabNavigator />
      {renderCustomThemeView()}
    </SafeAreaViewPlus>
  )
}

export default HomePage
