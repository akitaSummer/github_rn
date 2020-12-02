import { Dimensions } from 'react-native'

const BACKGROUND_COLOR = '#f3f3f4'
const { height, width } = Dimensions.get('window')

export default {
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  backgroundColor: BACKGROUND_COLOR,
  navBarHeightIOS: 44,
  navBarHeightAndroid: 50,
  windowHeight: height,
}
