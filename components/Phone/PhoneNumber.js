import React, {Component} from 'react';
import { View, Text } from 'react-native';

import styles from '../../constants/styles'

export default class PhoneNumber extends Component {
  render() {
    const {number} = this.props;
    const {color} = this.props;

    return (
      <View style={styles.phoneNumberContainer}>
        <Text style={[styles.textXlarge, styles[color]]}>{
          number.length > 13 ?
          '...' + number.substr(number.length - 13, 13) :
          number
        }</Text>
      </View>
    )
  }
}
