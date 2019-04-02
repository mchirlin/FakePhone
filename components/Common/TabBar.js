import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import AppButton from './AppButton'
import styles from '../../constants/styles'
import colors from '../../constants/colors'

export default class TabBar extends Component {

  render() {
    const {navigation, appBadges} = this.props

    return <View style={styles.tabBar}>
      <AppButton
         navigation={navigation}
         app="PhoneApp"
         icon="phone"
         backgroundColor={colors.blue}
         iconColor="white"
         badgeNumber={appBadges.phone} />
      <AppButton
        navigation={navigation}
        app="MessagesApp"
        icon="comment"
        backgroundColor={colors.blue}
        iconColor="white"
        badgeNumber={appBadges.message} />
      <AppButton
        navigation={navigation}
        app="MailApp"
        icon="envelope"
        backgroundColor="white"
        iconColor={colors.red}
        badgeNumber={appBadges.mail} />
      <AppButton
        navigation={navigation}
        app="MapsApp"
        icon="map"
        backgroundColor="white"
        badgeNumber={appBadges.map}
        iconColor={colors.yellow} />
    </View>
  }
}
