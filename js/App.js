import React from 'react'
import { Provider } from 'react-redux'
import AppNavigators from './navigator/AppNavigators'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigators />
    </Provider>
  )
}

export default App
