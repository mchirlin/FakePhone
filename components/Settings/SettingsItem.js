import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import styles from '../../constants/styles'

export default class SettingsItem extends Component {

  render() {
    const {item} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight
        style={styles.settingsItem}
        underlayColor='#b771cf'
        onPress={() => {
          navigation.navigate(item.screen)
        }}>
        <View style={styles.rowLayoutBetween}>
          <Text style={styles.textLarge}>{item.label}</Text>
          <Text style={styles.textLarge}>&gt;</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
