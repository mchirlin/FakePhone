import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import PhoneNumber from '../../components/Phone/PhoneNumber'
import PhoneCallTimer from '../../components/Phone/PhoneCallTimer'
import PhoneEndButton from '../../components/Phone/PhoneEndButton'

import { onCallEnd, onTimerUpdate } from '../../reducers/phoneReducer'
import { formatSeconds } from '../../reducers/functions'

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

const mapStateToProps = state => {
  const timerSeconds = state.phone.timerSeconds?state.phone.timerSeconds:0
  return {
    phoneNumber: state.phone.phoneNumber,
    timer: formatSeconds(timerSeconds)
   };
};

const mapDispatchToProps = {
  onCallEnd,
  onTimerUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneCallScreen);
