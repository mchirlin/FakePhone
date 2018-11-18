import React, {Component} from 'react';
import { View, Text } from 'react-native';

import styles from '../../constants/styles'

export default class PhoneCallTimer extends Component {
  componentDidMount() {
    const {onTimerUpdate} = this.props

    this.timerID = setInterval(onTimerUpdate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const {timer} = this.props;

    return (
      <Text style={[styles.textLarge, styles.textWhite]}>{timer}</Text>
    )
  }
}
