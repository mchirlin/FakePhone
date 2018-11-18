import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../../constants/styles'

export default class PhoneButton extends Component {

  render() {
    const {backgroundColor} = this.props
    const {number} = this.props
    const {letters} = this.props
    const {onPressItem} = this.props

    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}]} onPressIn={() => {
          onPressItem(number)
        }}>
        <Text style={styles.textXlarge}>{number}</Text>
        <Text style={styles.textMedium}>{letters}</Text>
      </TouchableOpacity>
    )
  }
}
