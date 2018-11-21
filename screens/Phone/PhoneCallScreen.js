import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import PhoneNumber from '../../components/Phone/PhoneNumber'
import PhoneCallTimer from '../../components/Phone/PhoneCallTimer'
import PhoneEndButton from '../../components/Phone/PhoneEndButton'

import { onCallEnd, onTimerUpdate } from '../../reducers/phoneReducer'

import styles from '../../constants/styles'

class PhoneCallScreen extends Component{
  static navigationOptions = {
    header: null
  }

  render() {
    const {navigation} = this.props
    const {phoneNumber} = this.props
    const {timer} = this.props
    const {onCallEnd, onTimerUpdate} = this.props

    return (
      <View style={styles.darkContainer}>
        <PhoneNumber color='textWhite' number={phoneNumber} />
        <PhoneCallTimer timer={timer} onTimerUpdate={onTimerUpdate} />
        <PhoneEndButton navigation={navigation} onPressItem={onCallEnd} />
      </View>
    )
  }
}

const formatSeconds = (sec) => {
  var hrs = Math.floor(sec / 3600);
  var min = Math.floor((sec - (hrs * 3600)) / 60);
  var seconds = sec - (hrs * 3600) - (min * 60);
  seconds = Math.round(seconds * 100) / 100

  var result = (hrs < 10 ? "0" + hrs : hrs);
  result += ":" + (min < 10 ? "0" + min : min);
  result += ":" + (seconds < 10 ? "0" + seconds : seconds);

  return result;
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.phone.phoneNumber,
    timer: formatSeconds(state.phone.timerSeconds)
   };
};

const mapDispatchToProps = {
  onCallEnd,
  onTimerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCallScreen);
