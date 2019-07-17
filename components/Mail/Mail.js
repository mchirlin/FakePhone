import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Video } from 'expo-av';
import { Image } from 'react-native-expo-image-cache';

import styles from '../../constants/styles'

export default class Mail extends Component {

  render() {
    const {email} = this.props

    return (
      <View style={styles.mailDetailBackground}>
        <Text style={styles.textLarge}>{email.subject}</Text>
        <View style={styles.listSeparator} />
        <Text style={styles.textMedium}>{email.from}</Text>
        <View style={[styles.rowLayout, {justifyContent: 'space-between'}]}>
          <Text style={styles.textMedium}>to: {email.to}</Text>
          <Text style={[styles.textMedium, styles.textBlue]}>{email.time}</Text>
        </View>
        <Text style={[styles.mailBody, styles.textMedium]}>{email.body}</Text>
        {
          email.image?(
            <Image
              style={{width: email.image.width, height: email.image.height}}
              uri={email.image.uri}
            />
          ):null
        }
        {
          email.video?(
            <Video
              source={{uri: email.video.uri}}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              useNativeControls
              style={{ width: email.video.width, height: email.video.height }}
            />
          ):null
        }
      </View>
    )
  }
}
