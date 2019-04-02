import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Badge } from 'react-native-elements'

import styles from '../../constants/styles'

export default class AppButton extends Component {
  render() {
    const {icon, iconColor, iconSize, navigation, app, badgeNumber, backgroundColor} = this.props

    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate(app)
      }}>
        <View style={[styles.appButton, backgroundColor?{backgroundColor: backgroundColor}:null]}>
          <FontAwesome name={icon} size={iconSize?iconSize:50} color={iconColor?iconColor:"#000"} />
        </View>
        {badgeNumber === 0?null:(
          <Badge
            status="warning"
            value={badgeNumber}
            textStyle={styles.textMedium}
            badgeStyle={styles.badge}
          />
        )}
      </TouchableOpacity>
    )
  }
}
