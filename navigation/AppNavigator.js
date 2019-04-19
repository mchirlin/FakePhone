import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import NavigationService from './NavigationService.js';
import StartStack from './StartStack';
import LockStack from './LockStack';
import HomeStack from './HomeStack';

import {onScreenSwitch} from '../reducers/homeReducer';

const stacks = {
  Start: StartStack,
  Lock: LockStack,
  Home: HomeStack
}

const Nav = createSwitchNavigator(stacks, {initialRouteName: 'Home'})
const NavLock = createSwitchNavigator(stacks, {initialRouteName: 'Start'})

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default class AppNavigator extends Component {

  render() {
    const {unlocked, store} = this.props;
    let AppContainer = null;

    if (unlocked == true) {
      AppContainer = createAppContainer(Nav);
    } else {
      AppContainer = createAppContainer(NavLock);
    }

    return (
      <AppContainer
        onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = getCurrentRouteName(currentState);
          const prevScreen = getCurrentRouteName(prevState);

          if (prevScreen !== currentScreen) {
            store.dispatch(onScreenSwitch(currentScreen));
          }
        }}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}
