import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import styles from '../../constants/styles'

export default class AppButton extends Component {
  render() {
    const {icon} = this.props
    const {navigation} = this.props
    const {app} = this.props

    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate(app)
      }}>
        <View style={styles.appButton}>
          <Entypo name={icon} size={60} color="#000" />
        </View>
      </TouchableOpacity>
    )
  }
}
