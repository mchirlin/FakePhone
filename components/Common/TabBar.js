import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import AppButton from './AppButton'
import styles from '../../constants/styles'

export default class TabBar extends Component {

  render() {
    const {navigation, appBadges} = this.props

    return <View style={styles.tabBar}>
      <AppButton navigation={navigation} app="PhoneApp" icon="phone" badgeNumber={appBadges.phone}/>
      <AppButton navigation={navigation} app="MessagesApp" icon="comment" badgeNumber={appBadges.message}/>
      <AppButton navigation={navigation} app="MailApp" icon="envelope" badgeNumber={appBadges.mail}/>
      <AppButton navigation={navigation} app="MapsApp" icon="map" badgeNumber={appBadges.map}/>
    </View>
  }
}
