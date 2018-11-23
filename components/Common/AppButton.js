import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Badge } from 'react-native-elements'

import styles from '../../constants/styles'

export default class AppButton extends Component {
  render() {
    const {icon, navigation, app, badgeNumber} = this.props

    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate(app)
      }}>
        <View style={styles.appButton}>
          <Entypo name={icon} size={60} color="#000" />
        </View>
        {badgeNumber === 0?null:(
          <Badge
            value={badgeNumber}
            textStyle={styles.textMedium}
            containerStyle={[styles.darkBackground, {position: 'absolute', bottom: 65, left: -5}]}
          />
        )}
      </TouchableOpacity>
    )
  }
}
