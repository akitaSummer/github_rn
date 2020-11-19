import React from 'react'
import {
  Platform,
  ViewPropTypes,
  View,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native'
import { PropTypes } from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 44
const NAV_BAR_HEIGHT_ANDROID = 50
const STATUS_BAR_HEIGHT = 20

const styles = StyleSheet.create({
  naBarButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: '#2196f3',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0, // android系统默认设置height
  },
})

const NavigationBar = (props) => {
  const {
    rightButton,
    titleView,
    titleLayoutStyle,
    leftButton,
    hide,
    statusBar,
    style,
    title,
  } = props

  const getButtonElement = (NavBarButton) => {
    return (
      <View style={styles.navBarButton}>
        {NavBarButton ? NavBarButton : null}
      </View>
    )
  }
  return (
    <View style={[styles.container, style]}>
      {!statusBar.hidden ? (
        <View style={styles.statusBar}>
          <StatusBar {...statusBar} />
        </View>
      ) : null}
      {hide ? null : (
        <View style={styles.navBar}>
          {getButtonElement(leftButton)}
          <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
            {titleView ? (
              titleView
            ) : (
              <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            )}
          </View>
          {getButtonElement(rightButton)}
        </View>
      )}
    </View>
  )
}

const StatusBarShape = {
  // 设置状态栏所接受的属性
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
}

NavigationBar.propTypes = {
  // 类型检查
  style: ViewPropTypes.style,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleView: PropTypes.element,
  titleLayoutStyle: ViewPropTypes.style,
  hide: PropTypes.bool,
  statusbar: PropTypes.shape(StatusBarShape),
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    hidden: false,
  },
}

export default NavigationBar
