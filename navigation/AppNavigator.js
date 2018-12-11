import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import NavigationService from './NavigationService.js';
import StartStack from './StartStack'
import LockStack from './LockStack'
import HomeStack from './HomeStack'

const stacks = {
  Start: StartStack,
  Lock: LockStack,
  Home: HomeStack
}

const Nav = createSwitchNavigator(stacks, {initialRouteName: 'Home'})
const NavLock = createSwitchNavigator(stacks, {initialRouteName: 'Start'})

export default class AppNavigator extends Component {

  render() {
    const {unlocked} = this.props;
    let AppContainer = null;

    if (unlocked == true) {
      AppContainer = createAppContainer(Nav);
    } else {
      AppContainer = createAppContainer(NavLock);
    }

    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )

  }
}
