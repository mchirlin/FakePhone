import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import PhoneNumber from '../../components/Phone/PhoneNumber'
import PhoneCallTimer from '../../components/Phone/PhoneCallTimer'
import PhoneEndButton from '../../components/Phone/PhoneEndButton'

import { onCallEnd, onTimerUpdate } from '../../reducers/phoneReducer'
import { formatSeconds } from '../../functions/timeFunctions'

import styles from '../../constants/styles'

class PhoneCallScreen extends Component{
  static navigationOptions = {
    header: null
  }

  render() {
    const {navigation} = this.props
    const {phoneNumber, phoneNumbers} = this.props
    const {timerSeconds, timer} = this.props
    const {onCallEnd, onTimerUpdate} = this.props

    let pn = phoneNumbers.filter( pn => pn.number === phoneNumber);
    if (pn.length > 0) callLength = pn[0].callLength;
    else callLength = 10;

    return (
      <View style={styles.darkContainer}>
        <PhoneNumber color='textWhite' number={phoneNumber} />
        <PhoneCallTimer
          timer={timer}
          timerSeconds={timerSeconds}
          onTimerUpdate={onTimerUpdate}
          onCallEnd={onCallEnd}
          callLength={callLength}
          navigation={navigation}
        />
        <PhoneEndButton navigation={navigation} onPressItem={onCallEnd} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  const timerSeconds = state.phone.timerSeconds?state.phone.timerSeconds:0
  return {
    phoneNumber: state.phone.phoneNumber,
    phoneNumbers: state.phone.phoneNumbers,
    timer: formatSeconds(timerSeconds),
    timerSeconds: timerSeconds
   };
};

const mapDispatchToProps = {
  onCallEnd,
  onTimerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCallScreen);
