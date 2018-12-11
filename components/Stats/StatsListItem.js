import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../../constants/styles'

export default class StatsListItem extends Component {

  render() {
    const {item} = this.props

    return (
      <View style={styles.statsItem}>
        <MaterialCommunityIcons name={item.icon} size={item.iconSize?item.iconSize:50} color={item.iconColor?item.iconColor:"#000"} />
        <Text style={[styles.textLargeBold, {flex: 1, marginLeft: 10}]}>{item.key}</Text>
        <Text style={[styles.textLarge, {fontFamily: 'Courier'}]}>{item.value}</Text>
      </View>
    )
  }
}
