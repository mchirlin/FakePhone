import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import { Calendar } from 'react-native-calendars';

import HomeButton from '../../components/Common/HomeButton'
import CalendarDay from '../../components/Calendar/CalendarDay'
import styles, { calendarTheme } from '../../constants/styles'
import colors from '../../constants/colors'
import { onDateSelect, onDateRemove, onDateAdd } from '../../reducers/calendarReducer'

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

  constructor(props){
    super(props);

    const {markedDates, onDateAdd, onDateRemove} = props;
    var today = new Date();

    Object.keys(markedDates).map(dateStr => {
      if(dateStr.includes("today")) {
        let relativeDays = parseInt(dateStr.replace(/[^-]+(-)?.*([0-9]+)/, "$1$2"));
        relativeDays = relativeDays ? relativeDays : 0;
        var dateCal = new Date();
        dateCal.setDate(today.getDate() + relativeDays);
        onDateAdd({date: dateCal.toISOString().slice(0,10), markedDate: markedDates[dateStr]});
        onDateRemove(dateStr);
      }
    });
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
  onDateSelect,
  onDateRemove,
  onDateAdd
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
