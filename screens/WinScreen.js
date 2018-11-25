import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';

import styles from '../constants/styles'
import { formatSeconds } from '../reducers/functions'

class WinScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'You win!',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge
    }
  };

  render() {
    const {navigation, timeStart} = this.props

    return (
      <View style={styles.lightContainer}>
        <Text style={styles.textXlargeBold}>You Win!!</Text>
        <Text style={styles.textLargeBold}>It took you {
          formatSeconds(((new Date()).getTime() - timeStart)/1000)
        } to complete to mission</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeStart: state.lock.timeStart
  }
};

export default connect(mapStateToProps)(WinScreen);
