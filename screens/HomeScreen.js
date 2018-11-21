import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TabBar from '../components/Common/TabBar'
import AppButtonGrid from '../components/Common/AppButtonGrid'
import styles from '../constants/styles'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigation} = this.props

    return (
      <View style={styles.lightContainer}>
        <View style={styles.contentContainer}>
          <AppButtonGrid navigation={navigation} />
        </View>
        <TabBar navigation={navigation} />
      </View>
    );
  }
}
