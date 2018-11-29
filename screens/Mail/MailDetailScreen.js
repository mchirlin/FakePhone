import React, { Component } from 'react';
import { FlatList, TouchableHighlight, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { Video } from 'expo'
import { Image } from 'react-native-expo-image-cache';

import styles from '../../constants/styles'

class MailDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // title: navigation.getParam('title'),
      title: 'Email',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.mailHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    const {emails, navigation} = this.props
    const itemId = navigation.getParam('itemId', 0);

    const email = emails[itemId]

    return (
      <View style={styles.mailDetailContainer}>
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
                source={{uri: email.image.uri}}
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    emails: state.mail.emails
  }
};

export default connect(mapStateToProps)(MailDetailScreen);
