import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { getDayOfWeek } from '../../functions/timeFunctions'
import styles from '../../constants/styles'

export default class CalendarDay extends Component {
  render() {
    const { day, event } = this.props;

    return (
      <View style={[styles.lightBackground, {flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
        <View style={[styles.rowLayout, {flex: 1}]}>
          <View style={[{width: '33%', justifyContent: 'center', alignItems: 'center'}]}>
            <Text style={[styles.textXlarge, styles.textGray]}>{day.day}</Text>
            <Text style={[styles.textLarge, styles.textGray]}>{getDayOfWeek(new Date(day.timestamp))}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flex: 1, height: '100%'}}>
            {event?<Text style={styles.textLarge}>{event.description}</Text>:null}
          </View>
        </View>
      </View>
    )
  }
}
