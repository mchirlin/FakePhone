import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import styles from '../../constants/styles'

class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Calendar',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge
    }
  }

  render() {
    return (
      <View style={styles.lightBackground}>
        <Calendar />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
