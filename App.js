import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'

import AppNavigator from './navigation/AppNavigator';
import reducer from './reducers/index'
import {updateObjectInArray} from './reducers/functions'

import { Font, AppLoading, Icon } from 'expo';

const store = createStore(reducer);

class App extends Component {

  state = {
    isLoadingComplete: false,
    timer: {
      started: false,
      startedOn: null
    },
    triggers: [
      {
        status: 'active',
        startTime: (new Date()).getTime(),
        duration: 3000,
        action: '{"type": "MAIL_ADD", "payload": {"to": "TO", "from": "FROM", "time": "TIME", "subject": "SUBJECT", "body": "BODY"}}'
      }
    ]
  };

  constructor(props){
    super(props)

    this.calculateActions = this.calculateActions.bind(this)
  }

  componentDidMount() {
    this.timerID = setInterval(()=> {
      let actions = this.calculateActions(this.state);
      actions.forEach((item) => {
        console.log(item)
      })
    }, 1000); //something short
  }

  calculateActions (state) {
    let { timer, triggers } = state;
    let actions = [];
    // If 10 seconds have passed.
    if (timer.started && (new Date()).getTime() - timer.startedOn > 10 * 1000) {
      triggers.forEach((item, index) => {
        if(item.status === 'active' &&
          (new Date()).getTime() > item.startTime + item.duration
        ) {
          console.log('Triggering payload', item.action, this.state)
          this.setState({
            ...this.state,
            triggers: updateObjectInArray(triggers, {
              index: index,
              item: {
                ...triggers[index],
                status: 'completed'
              }
            })
          })
          store.dispatch(JSON.parse(item.action))
          console.log('Updated state', this.state)
        }
      })
    } else if (!timer.started) {
      this.setState({
        ...this.state,
        timer: {
          ...timer,
          started: true,
          startedOn: (new Date()).getTime() - 1000
        }
      })
    }
    // etc...
    return actions;
  }

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
