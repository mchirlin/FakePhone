import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux'
import { Video } from 'expo'

import styles from '../../constants/styles'

class MailDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // title: navigation.getParam('title'),
      title: 'Email',
      headerTitleStyle: styles.textLarge
    }
  }

  // componentDidMount() {
  //   const {navigation, selectedEmail, emails} = this.props
  //   navigation.setParams({title: emails[selectedEmail].subject})
  // }

  render() {
    const {selectedEmail, emails} = this.props

    const email = emails[selectedEmail]

    return (
      <View style={styles.mailDetailContainer}>
        <View style={styles.mailDetailBackground}>
          <Text style={styles.textLarge}>{email.subject}</Text>
          <View style={styles.listSeparator} />
          <Text style={styles.textMedium}>{email.from}</Text>
          <View style={styles.rowLayout}>
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
    selectedEmail: state.mail.selectedEmail,
    emails: state.mail.emails
  }
};

export default connect(mapStateToProps)(MailDetailScreen);
