import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export const MORE_MENU = {
  CustomLanguage: {
    text: '自定义语言',
    Icons: Ionicons,
    icon: 'md-checkbox-outline',
  },
  SortLanguage: {
    text: '语言排序',
    Icons: MaterialCommunityIcons,
    icon: 'sort',
  },
  CustomTheme: {
    text: '自定义主题',
    Icons: Ionicons,
    icon: 'ios-color-palette',
  },
  CustomKey: {
    text: '自定义标签',
    Icons: Ionicons,
    icon: 'md-checkbox-outline',
  },
  SortKey: {
    text: '标签排序',
    Icons: MaterialCommunityIcons,
    icon: 'sort',
  },
  RemoveKey: { text: '标签移除', Icons: Ionicons, icon: 'md-remove' },
  AboutAuthor: { text: '关于作者', Icons: Octicons, icon: 'smiley' },
  About: { text: '关于', Icons: Ionicons, icon: 'logo-github' },
  Tutorial: { text: '教程', Icons: Ionicons, icon: 'ios-bookmarks' },
  Feedback: { text: '反馈', Icons: MaterialIcons, icon: 'feedback' },
  Share: { text: '分享', Icons: Ionicons, icon: 'md-share' },
}
