import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, ImageBackground, Text, View, Button, Alert } from 'react-native';
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Font, AppLoading, Icon, Location, Permissions, Notifications, SplashScreen } from 'expo';
import { getDistance} from 'geolib'

import AppNavigator from './navigation/AppNavigator';
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
        Alert.alert(
          'New Updates',
          'You have received updates, check your home screen',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      }
      actions.forEach((item) => {
        this.store.dispatch(item)
      })
    }, 1000); //something short

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
        this.store.dispatch(item)
      })
    })
  }

  activateLocationEvents (coords) {
    const {event, map} = this.store.getState()

    let actions = []

    event.events.forEach((item, index) => {
      if(item.location && item.status === 'pending') {
        if (getDistance(item.location, coords.coords) < item.distance) {
          actions.push(onEventActivate(item.id))
          if(item.location.id) actions.push(onMarkerFound(item.location.id))
        }
      }
    })

    map.markers.forEach((marker, index) => {
      if(!marker.found) {
        if(getDistance(marker, coords.coords) < marker.distance) {
          actions.push(onMarkerFound(marker.id))
        }
      }
    })

    actions.push(onLocationUpdate(coords))

    return actions
  }

  calculateActions (state) {
    const {event} = this.store.getState()

    let actions = []

    if (event.timer) {
      event.events.forEach((item, index) => {
        if(
          item.status === 'active' &&
          (new Date()).getTime() > (item.startedOn?item.startedOn:event.timer.startedOn) + item.delay
        ) {
          console.log('Triggering payload', item.action, this.state)
          actions.push(onEventComplete(item))
          actions.push(
            {
              type: item.action.type,
              payload: JSON.parse(item.action.payload)
            }
          )
        }
      })
    } else {
      this.store.dispatch(onEventTimerStart())
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
        />
    </View>
      );
    } else {
      console.log("Unlocked", unlocked)
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator initialRouteName={unlocked?'Home':'Lock'}/>
          <Button onPress={() => {
            persistor.purge()
            loadingPersistor.purge()
          }} title="Purge"/>
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
        <ImageBackground
          source={require('./assets/images/splash.png')}
          style={{width: '100%', height: '100%', backgroundColor: '#008080'}}>
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
            autoHideSplash={false}
          />
        </ImageBackground>
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
