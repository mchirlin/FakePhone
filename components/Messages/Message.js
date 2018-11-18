import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { messageStyles } from '../../constants/styles'

export default class Message extends Component {

  render() {
    const {align} = this.props

    return (
      <View style={messageStyles[align].container}>
        <View style={messageStyles[align].wrapper}>
          <Text style={messageStyles[align].text}>Let's make this a much longer message so we get a better idea of what it looks like</Text>
        </View>
      </View>
    )
  }
}
