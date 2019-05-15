import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { messageStyles } from '../../constants/styles'

export default class Message extends Component {

  render() {
    const {message} = this.props
    const align = message.isMe?'right':'left'

    return (
      <View style={messageStyles[align].container}>
        <View style={messageStyles[align].wrapper}>
          {
            message.message?(
              <Text style={messageStyles[align].text}>{message.message}</Text>
            ):null
          }
          {
            message.image?(
              <Image
                style={{width: message.image.width, height: message.image.height, borderRadius: 15}}
                uri={message.image.uri}
              />
            ):null
          }
        </View>
      </View>
    )
  }
}
