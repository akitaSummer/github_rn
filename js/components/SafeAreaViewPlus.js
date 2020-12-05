import React from 'react'
import {
  StyleSheet,
  ViewPropTypes,
  SafeAreaView,
  View,
  DeviceInfo,
} from 'react-native'
import { PropTypes } from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topArea: {
    height: 44,
  },
  bottomArea: {
    height: 34,
  },
})

const SafeAreaViewPlus = (props) => {
  const {
    enablePlus,
    children,
    topColor,
    bottomColor,
    topInset,
    bottomInset,
    style,
  } = props

  const genSafeAreaViewPlus = () => (
    <View style={[styles.container, style]}>
      {getTopArea(topColor, topInset)}
      {children}
      {getBottomArea(bottomColor, bottomInset)}
    </View>
  )

  const genSafeAreaView = () => (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  )

  const getTopArea = () =>
    !DeviceInfo.isIPhoneX_deprecated || !topInset ? null : (
      <View style={[styles.topArea, { backgroundColor: topColor }]} />
    )

  const getBottomArea = () =>
    !DeviceInfo.isIPhoneX_deprecated || !bottomInset ? null : (
      <View style={[styles.bottomArea, { backgroundColor: bottomColor }]} />
    )

  return enablePlus ? genSafeAreaViewPlus() : genSafeAreaView()
}

SafeAreaViewPlus.propTypes = {
  ...ViewPropTypes,
  topColor: PropTypes.string,
  bottomColor: PropTypes.string,
  enablePlus: PropTypes.bool,
  topInset: PropTypes.bool,
  bottomInset: PropTypes.bool,
}

SafeAreaViewPlus.defaultProps = {
  topColor: 'transparent',
  bottomColor: '#f8f8f8',
  enablePlus: true,
  topInset: true,
  bottomInset: true,
}

export default SafeAreaViewPlus
