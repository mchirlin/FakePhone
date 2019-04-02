import React, { Component } from 'react';
import { Alert, Button, Image, ImageBackground, Platform, StatusBar, StyleSheet, Text, View  } from 'react-native';
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Asset, AppLoading, Font, Icon, Location, Notifications, Permissions, SplashScreen } from 'expo';
import { getDistance} from 'geolib'
import { CacheManager } from 'react-native-expo-image-cache';

import AppNavigator from './navigation/AppNavigator';
import NavigationService from './navigation/NavigationService.js';
import {updateObjectInArray} from './reducers/functions'
import persistConfig from './reducers/index'

import {onEventTimerStart, onEventActivate, onEventComplete} from './reducers/eventReducer'
import {onLocationUpdate, onMarkerFound} from './reducers/mapReducer'

class FakePhone extends Component {

  state = {
    isLoadingComplete: false
  };

  constructor(props){
    super(props)

    const {url, store} = this.props

    this.store = store
    this.calculateActions = this.calculateActions.bind(this)
    this.activateLocationEvents = this.activateLocationEvents.bind(this)
    this._loadResourcesAsync = this._loadResourcesAsync.bind(this)
    this.alertPresent = false
  }

  async componentDidMount() {
    const {map} = this.store.getState()

    this.timerID = setInterval(async () => {
      let actions = this.calculateActions(this.state);
      if (actions.length > 0) {
        // Notifications.getBadgeNumberAsync().then(badgeNumber => {
        //   console.log('Badge Number:', badgeNumber)
        //   Notifications.setBadgeNumberAsync(badgeNumber + actions.length);
        // });
        if (!this.alertPresent) {
          this.alertPresent = true
          Alert.alert(
            'New Updates',
            'You have received updates, check your home screen',
            [
              {
                text: 'OK',
                onPress: () => this.alertPresent = false
              }
            ],
            { cancelable: false }
          )
        }
      }
      actions.forEach((item) => {
        if (item.type === 'NAVIGATE') {
          NavigationService.navigate(item.payload.screen);
        } else {
          this.store.dispatch(item);
        }
      })
    }, 1000);

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    Location.watchPositionAsync({
      enableHighAccuracy: true,
      distanceInterval: 5
    }, (coords) => {
      let actions = this.activateLocationEvents(coords)
      actions.forEach((item) => {
        if (item.type === 'NAVIGATE') {
          NavigationService.navigate(item.payload.screen);
        } else {
          this.store.dispatch(item);
        }
      })
    })
  }

  activateLocationEvents (coords) {
    const {event, map} = this.store.getState()

    let actions = []

    if (event.events) {
      event.events.forEach((item, index) => {
        if(item.location && item.status === 'pending') {
          if (getDistance(item.location, coords.coords) < item.distance) {
            actions.push(onEventActivate(item.id))
            if(item.location.id) actions.push(onMarkerFound(item.location.id))
          }
        }
      })
    }

    if (map.markers) {
      map.markers.forEach((marker, index) => {
        if(!marker.found) {
          if(getDistance(marker, coords.coords) < marker.distance) {
            actions.push(onMarkerFound(marker.id))
          }
        }
      })
    }

    actions.push(onLocationUpdate(coords))

    return actions
  }

  calculateActions (state) {
    const {event} = this.store.getState()

    let actions = []

    if (event.timer && event.events) {
      event.events.forEach((item, index) => {
        if(
          item.status === 'active' &&
          (new Date()).getTime() > (item.startedOn?item.startedOn:event.timer.startedOn) + item.delay
        ) {
          actions.push(onEventComplete(item));
          actions.push(
            {
              type: item.action.type,
              payload: JSON.parse(item.action.payload)
            }
          );
        }
      })
    } else {
      this.store.dispatch(onEventTimerStart());
    }

    return actions;
  }

  getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       errorMessage: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.store.dispatch(onLocationChage).setState({ location });
 };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const {store, persistor, loadingPersistor} = this.props

    const {unlocked} = store.getState().lock

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
          <AppNavigator unlocked={unlocked}/>
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

    const { loadingPersistor } = this.props
    if (this.state.isLoadingComplete) {
      return (
        <Provider store={this.store}>
          <PersistGate loading={null} persistor={this.persistor}>
            <FakePhone
              loadingPersistor={loadingPersistor}
              persistor={this.persistor}
              store={this.store}
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
    const { url } = this.props
    const { store, persistor } = await persistConfig(url)

    this.store = store
    this.persistor = persistor

    this.setState({isLoadingComplete: true})
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
