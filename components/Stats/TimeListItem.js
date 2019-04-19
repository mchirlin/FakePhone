import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../../constants/styles'

export default class TimeListItem extends Component {

  render() {
    const {item, navigation} = this.props;

    return (
      <View style={item.label=="Total"?[styles.statsItem,{backgroundColor:"#EEE"}]:styles.statsItem}>
        <View style={{width: 50}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons name={item.icon} size={item.iconSize?item.iconSize:50} color={item.iconColor?item.iconColor:"#000"} />
          </View>
        </View>
        <Text style={[styles.textLargeBold, {flex: 1, marginLeft: 10}]}>{item.label}</Text>
        <Text style={[styles.textLarge, {fontFamily: 'Courier'}]}>{item.value}</Text>
      </View>
    )
  }
}
