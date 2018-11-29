import React, { Component } from 'react'
import { createSwitchNavigator } from 'react-navigation';

import LockStack from './LockStack'
import HomeStack from './HomeStack'
import WinStack from './WinStack'

const stacks = {
  Lock: LockStack,
  Home: HomeStack,
  Win: WinStack
}

const Nav = createSwitchNavigator(stacks, {initialRouteName: 'Home'})
const NavLock = createSwitchNavigator(stacks, {initialRouteName: 'Lock'})

export default class AppNavigator extends Component {

  render() {
    const {unlocked} = this.props

    if (unlocked == true) {
      return (<Nav />)
    } else {
      return (<NavLock />)
    }
  }
}
