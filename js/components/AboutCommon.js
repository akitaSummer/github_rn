import React, { useEffect } from 'react'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import useBackPress from '../hooks/useBackPress'
import config from '../res/data/config.json'
import {
  View,
  Platform,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native'
import { getLeftBackButton, getShareButton } from '../utils/viewUtils'
import GlobalStyles from '../res/globalStyles'

const THEME_COLOR = '#678'
const AVATAR_SIZE = 90
const PARALLAX_HEADER_HEIGHT = 270
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios'
    ? GlobalStyles.navBarHeightIOS + 20
    : GlobalStyles.navBarHeightAndroid
const window = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    paddingTop: 0,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 10,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
})

export const FLAG_ABOUT = {
  FLAG_ABOUT: 'FLAG_ABOUT',
  FLAG_ABOUT_ME: 'FLAG_ABOUT_ME',
}

const AboutCommon = (props) => {
  const { navigation, updateState, params, data, children } = props

  const onBackFunc = () => {
    navigation.goBack()
    return
  }

  useBackPress(() => {
    onBackFunc()
    return true
  })

  const getParallaxRenderConfig = (params) => {
    const config = {}
    const avatar =
      typeof params.avatar === 'string' ? { uri: params.avatar } : params.avatar

    config.renderBackground = () => (
      <View key={'background'}>
        <Image
          source={{
            uri: params.backgroundImg,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: window.width,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            height: PARALLAX_HEADER_HEIGHT,
          }}
        />
      </View>
    )

    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.sectionSpeakerText}>{params.name}</Text>
        <Text style={styles.sectionTitleText}>{params.description}</Text>
      </View>
    )
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    )
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        {getLeftBackButton(() => navigation.goBack())}
        {getShareButton(() => onShare())}
      </View>
    )

    return config
  }

  // const getConfig = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://www.devio.org/io/GitHubPopular/json/github_app_config.json',
  //     )
  //     if (response.ok) {
  //       const config = await response.json()
  //       if (config)
  //         updateState({
  //           data: config,
  //         })
  //     } else {
  //       throw new Error('Network Error')
  //     }
  //   } catch (e) {
  //     throw e
  //   }
  // }

  useEffect(() => {
    // getConfig()
    updateState({ ...config })
  }, [])

  return (
    <ParallaxScrollView
      backgroundColor={THEME_COLOR}
      contentBackgroundColor={GlobalStyles.backgroundColor}
      parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
      stickyHeaderHeight={STICKY_HEADER_HEIGHT}
      // renderScrollComponent={() => <Animated.view />}
      // renderScrollComponent={() => <AnimatedCustomScroll />}
      backgroundScrollSpeed={10}
      // renderForeground={() => (
      //   <View style={{ height: 300, flex: 1, alignItems: 'center' }}>
      //     <Text>Hello world!</Text>
      //   </View>
      // )}
      {...getParallaxRenderConfig(data)}>
      {children}
    </ParallaxScrollView>
  )
}

export default AboutCommon
