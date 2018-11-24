import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View, Button, Alert } from 'react-native';
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Font, AppLoading, Icon, Location, Permissions, Notifications } from 'expo';
import { getDistance} from 'geolib'

import AppNavigator from './navigation/AppNavigator';
import {updateObjectInArray} from './reducers/functions'
import persistConfig from './reducers/index'

const {store, persistor}  = persistConfig()

import {onEventTimerStart, onEventActivate, onEventComplete} from './reducers/eventReducer'
import {onLocationUpdate, onMarkerFound} from './reducers/mapReducer'

class App extends Component {

  state = {
    isLoadingComplete: false
  };

  constructor(props){
    super(props)

    this.calculateActions = this.calculateActions.bind(this)
    this.activateLocationEvents = this.activateLocationEvents.bind(this)
  }

  async componentDidMount() {
    const {map} = store.getState()

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
        store.dispatch(item)
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
        store.dispatch(item)
      })
    })
  }

  activateLocationEvents (coords) {
    const {event, map} = store.getState()

    let actions = []

    event.events.forEach((item, index) => {
      if(item.location) {
        if (getDistance(item.location, coords.coords) < item.distance) {
          actions.push(onEventActivate(item.id))
          if(item.location.id) actions.push(onMarkerFound(item.location.id))
        }
      }
    })

    console.log('Checking location against', map.markers)
    map.markers.forEach((marker, index) => {
      console.log(marker)
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
    const {event} = store.getState()

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
      store.dispatch(onEventTimerStart())
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
   store.dispatch(onLocationChage).setState({ location });
 };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

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
          <AppNavigator/>
          <Button onPress={() => {persistor.purge()}} title="Purge"/>
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
        <PersistGate loading={null} persistor={persistor}>
          <App persitor={persistor} />
        </PersistGate>
      </Provider>
    );
  }
}
