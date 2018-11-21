import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Message from '../../components/Messages/Message'
import styles from '../../constants/styles'

export default class MessagesScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Particular Message',
      headerTitleStyle: styles.textLarge
    }
  }

  render() {
    return (
      <View style={styles.lightContainer}>
        <Message align='left'>Messages Screen</Message>
        <Message align='right'>Messages Screen</Message>
        <Message align='left'>Messages Screen</Message>
      </View>
    );
  }
}
