import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import HomeButton from '../../components/Common/HomeButton'
import styles, { calendarTheme } from '../../constants/styles'

class CalendarScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Calendar',
      headerLeft: (
        <HomeButton navigation={navigation} color="#fff" />
      ),
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.calendarHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    return (
      <View style={styles.lightBackground}>
        <Calendar theme={calendarTheme} />
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
