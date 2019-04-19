import React, { Component } from 'react';
import { Alert, Button, Image, ImageBackground, Platform, StatusBar, StyleSheet, Text, View  } from 'react-native';
import { connect, Provider } from 'react-redux'
import { purgeStoredState } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Asset, AppLoading, Font, Icon, Location, Notifications, Permissions, SplashScreen, TaskManager } from 'expo';
import { CacheManager } from 'react-native-expo-image-cache';

import AppNavigator from './navigation/AppNavigator';
import {updateObjectInArray} from './functions/arrayFunctions'
import {getTimerActions, getLocationActions, getNotificationMessage, handleActions} from './functions/actionFunctions'
import persistConfig from './reducers/index'

import { LOCATION_TASK_NAME } from './constants/tasks'

globalStore = null;

class FakePhone extends Component {

  state = {
    isLoadingComplete: false
  };

  constructor(props){
    super(props);

    const {store} = this.props;

    this.store = store;
    this._loadResourcesAsync = this._loadResourcesAsync.bind(this);
    this.alertPresent = false;
  }

  async componentDidMount() {
    const {map} = this.store.getState();

    this.timerID = setInterval(async () => {
      let actions = getTimerActions(this.store.getState());
      let screen = this.store.getState().home.screen;
      if (actions.length > 0) {
        let notification = getNotificationMessage(actions, screen);
        if (!this.alertPresent && notification) {
          this.alertPresent = true;
          Alert.alert(
            notification.title,
            notification.body,
            [
              {
                text: 'OK',
                onPress: () => {
                  this.alertPresent = false;
                  Notifications.setBadgeNumberAsync(0);
                }
              }
            ],
            { cancelable: false }
          );
        }
      }
      handleActions(this.store, actions);
    }, 1000);

    let { status : locationStatus } = await Permissions.askAsync(Permissions.LOCATION);
    if (locationStatus !== 'granted') {
      console.warn('Permission to access location was denied');
    }

    let { status : notificationStatus } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (notificationStatus !== 'granted') {
      console.warn('Permission to notifications was denied');
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const {store} = this.props;
    const {unlocked} = store.getState().lock;

    if (!this.state.isLoadingComplete) {
      return (
        <View>
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
            autoHideSplash={false}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator
            unlocked={unlocked}
            store={store}
          />
        </View>
      );
    }
  }

  cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font));
  }

  _loadResourcesAsync = async () => {
    const imageAssets = this.cacheImages([
      require('./assets/images/bank-logo.png'),
      require('./assets/images/splash.png')
    ]);

    //  Cache background
    const uri = this.store.getState().home.background;
    const path = await CacheManager.get(uri).getPath();

    const fontAssets = this.cacheFonts([{
      'balsamiq-sans-regular': require('./assets/fonts/BalsamiqSansRegular.ttf'),
      'balsamiq-sans-bold': require('./assets/fonts/BalsamiqSansBold.ttf'),
    }]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
    SplashScreen.hide()
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default class RootComponent extends Component {

  state = {
    isLoadingComplete: false
  };

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <Provider store={this.store}>
          <PersistGate loading={null} persistor={this.persistor}>
            <FakePhone
              persistor={this.persistor}
              store={this.store}
              navigation={this.props.navigation}
            />
          </PersistGate>
        </Provider>
      );
    } else {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
          autoHideSplash={false}
        />
      )
    }
  }

  _loadResourcesAsync = async () => {
    const { store, persistor } = await persistConfig();

    //purgeStoredState(persistConfig);

    // For task manager
    globalStore = store;

    // For FakePhone
    this.store = store;
    this.persistor = persistor;

    this.setState({isLoadingComplete: true});
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data && globalStore) {
    const { locations } = data;

    let actions = getLocationActions(globalStore.getState(), locations[0]);
    handleActions(globalStore, actions);
  }
});
