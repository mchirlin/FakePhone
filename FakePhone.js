import React, { Component } from 'react';
import { Alert, Button, Image, ImageBackground, Platform, StatusBar, StyleSheet, Text, View  } from 'react-native';
import { connect, Provider } from 'react-redux'
import { purgeStoredState } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Asset, AppLoading, Font, Icon, Location, Notifications, Permissions, SplashScreen, TaskManager } from 'expo';
import { CacheManager } from 'react-native-expo-image-cache';
import { Audio } from 'expo'

import AppNavigator from './navigation/AppNavigator';

import { settings } from './constants/sounds'
import { mapAudioTrackToSound } from './functions/soundFunctions'
import {updateObjectInArray} from './functions/arrayFunctions'
import {getTimerActions, getLocationActions, getNotification, handleActions} from './functions/actionFunctions'
import persistConfig from './reducers/index'

import { LOCATION_TASK_NAME } from './constants/tasks'

globalStore = null;
soundPlaying = false;

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
    this.onPlaybackStatusUpdate = this.onPlaybackStatusUpdate.bind(this);
  }

  async componentDidMount() {
    const { map, notification } = this.store.getState();

    this.timerID = setInterval(async () => {
      let actions = getTimerActions(this.store.getState());
      let screen = this.store.getState().home.screen;
      handleActions(this.store, actions);
      if (actions.length > 0) {
        let notification = getNotification(actions, screen, this.store.getState());
        console.log("notification", notification);
        if (!this.alertPresent && notification) {
          this.alertPresent = true;

          if (notification.sound && !soundPlaying) {
            soundPlaying = true;
            await this.soundObject.loadAsync({uri: notification.sound});
            await this.soundObject.playAsync();
          }

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
    }, 1000);

    let { status : locationStatus } = await Permissions.askAsync(Permissions.LOCATION);
    if (locationStatus !== 'granted') {
      console.warn('Permission to access location was denied');
    }

    let { status : notificationStatus } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (notificationStatus !== 'granted') {
      console.warn('Permission to notifications was denied');
    }

    Audio.setAudioModeAsync(settings);
    this.soundObject = new Audio.Sound()
    this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
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

  onPlaybackStatusUpdate (playbackStatus) {
    if (playbackStatus.didJustFinish) {
      this.soundObject.unloadAsync();
      soundPlaying = false;
    }
  }
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
  try {
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data && globalStore) {
      const { locations } = data;

      let actions = getLocationActions(globalStore.getState(), locations[0]);
      handleActions(globalStore, actions);
    }
  } catch {}
});
