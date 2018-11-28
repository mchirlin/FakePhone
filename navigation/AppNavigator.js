import React, { Component } from 'react'
import { createSwitchNavigator } from 'react-navigation';

import LockStack from './LockStack'
import HomeStack from './HomeStack'
import PhoneStack from './PhoneStack'
import MessagesStack from './MessagesStack'
import MailStack from './MailStack'
import MapsStack from './MapsStack'
import BankStack from './BankStack'
import CalendarStack from './CalendarStack'
import CameraStack from './CameraStack'
import PhotosStack from './PhotosStack'
import SettingsStack from './SettingsStack'
import WinStack from './WinStack'

const stacks = {
  Lock: LockStack,
  Home: HomeStack,
  PhoneApp: PhoneStack,
  MessagesApp: MessagesStack,
  MailApp: MailStack,
  MapsApp: MapsStack,
  BankApp: BankStack,
  CalendarApp: CalendarStack,
  CameraApp: CameraStack,
  PhotosApp: PhotosStack,
  SettingsApp: SettingsStack,
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
