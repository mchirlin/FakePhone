import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'

import AppNavigator from './navigation/AppNavigator';
import reducer from './reducers/index'

import { Font, AppLoading, Icon } from 'expo';

const store = createStore(reducer);
console.log(store.getState())

class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View>
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
    </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'balsamiq-sans-regular': require('./assets/fonts/BalsamiqSansRegular.ttf'),
        'balsamiq-sans-bold': require('./assets/fonts/BalsamiqSansBold.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
