import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const {store, persistor}  = persistConfig()
import persistConfig from './reducers/loadingStore'
import PhoneSelector from './screens/PhoneSelector'

class App extends Component {

  render() {
    return (
      <PhoneSelector persistor={persistor} />
    )
  }
}

export default class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App persistor={persistor} />
        </PersistGate>
      </Provider>
    );
  }
}
