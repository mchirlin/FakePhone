import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { messageStyles } from '../../constants/styles'

export default class Message extends Component {

  render() {
    const {message} = this.props
    const align = message.isMe?'right':'left'

    return (
      <View style={messageStyles[align].container}>
        <View style={messageStyles[align].wrapper}>
          <Text style={messageStyles[align].text}>{message.message}</Text>
        </View>
      </View>
    )
  }
}
