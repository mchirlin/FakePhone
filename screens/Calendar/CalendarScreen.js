import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Calendar } from 'react-native-calendars';

import HomeButton from '../../components/Common/HomeButton'
import CalendarDay from '../../components/Calendar/CalendarDay'
import styles, { calendarTheme } from '../../constants/styles'
import colors from '../../constants/colors'
import { onDateSelect } from '../../reducers/calendarReducer'

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
    const {markedDates, onDateSelect, dateSelected} = this.props;

    return (
      <View style={styles.centeredContainer}>
        <Calendar
          theme={calendarTheme}
          markedDates={markedDates}
          onDayPress={(day) => {
            onDateSelect(day);
          }}
          onMonthChange={(month) => {
            onDateSelect(null);
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
    markedDates: state.calendar.markedDates,
    dateSelected: state.calendar.dateSelected
  }
};

const mapDispatchToProps = {
  onDateSelect
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
