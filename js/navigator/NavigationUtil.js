export class HomePageNavigation {
  // 使用#设置私有变量
  static #navigation = null
  static setNavigation = (navigation) => {
    HomePageNavigation.#navigation = navigation
  }
  static getNavigation = () => {
    return HomePageNavigation.#navigation
  }
}

export const resetToHomePage = (params) => {
  const { navigation } = params
  navigation.navigate('Main')
}

export const goPage = (params, page) => {
  const navigation = HomePageNavigation.getNavigation()
  navigation.navigate(page, { ...params })
}
