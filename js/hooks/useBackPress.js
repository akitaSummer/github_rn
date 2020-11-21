import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'

const useBackPress = (backPress) => {
  const onHardwareBackPress = (e) => backPress(e)

  useEffect(() => {
    if (backPress) {
      BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress)
    }
    return () => {
      if (backPress) {
        BackHandler.removeEventListener('hardwareBackPress')
      }
    }
  }, [backPress])
}

export default useBackPress
