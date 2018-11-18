import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';

import styles from '../../constants/styles'

export default class MailDetailScreen extends Component {
  static navigationOptions = {
    title: 'Particular Email',
  };

  render() {
    return (
      <View style={styles.mailDetailContainer}>
        <View style={styles.mailDetailBackground}>
          <Text style={styles.largeTextBold}>Michael</Text>
          <View style={styles.rowLayout}>
            <Text style={styles.mediumText}>to: me</Text>
            <Text style={[styles.mediumText, styles.blueText]}>8:39 am</Text>
          </View>
          <View style={styles.listSeparator} />
          <Text style={[styles.mailBody, styles.mediumText]}>This is the entire email</Text>
        </View>
      </View>
    );
  }
}
