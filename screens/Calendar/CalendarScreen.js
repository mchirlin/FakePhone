import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Calendar } from 'react-native-calendars';

import HomeButton from '../../components/Common/HomeButton'
import CalendarDay from '../../components/Calendar/CalendarDay'
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

  state = {
    dateSelected: null
  }

  render() {
    const {markedDates} = this.props;
    const {dateSelected} = this.state;

    return (
      <View style={styles.centeredContainer}>
        <Calendar
          theme={calendarTheme}
          markedDates={markedDates}
          onDayPress={(day) => {
            this.setState({dateSelected: day});
          }}
          onMonthChange={(month) => {
            this.setState({dateSelected: null});
          }}
        />
          <View style={styles.listSeparator} />
        {
          dateSelected?<CalendarDay day={dateSelected} event={markedDates[dateSelected.dateString]} />:null
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    markedDates: state.calendar.markedDates
  }
};

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
