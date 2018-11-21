import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import AppButton from './AppButton'
import styles from '../../constants/styles'

export default class TabBar extends Component {

  render() {
    const {navigation} = this.props

    return <View style={styles.tabBar}>
      <AppButton navigation={navigation} app="PhoneApp" icon="phone" />
      <AppButton navigation={navigation} app="MessagesApp" icon="message" />
      <AppButton navigation={navigation} app="MailApp" icon="mail" />
      <AppButton navigation={navigation} app="MapsApp" icon="map" />
    </View>
  }
}
