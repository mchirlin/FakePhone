import React, {Component} from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../../constants/styles'

export default class PhoneBackButton extends Component {

  render() {
    const {onPressItem} = this.props

    return (
      <TouchableOpacity style={styles.buttonBack} onPress={() => onPressItem()}>
        <Text style={styles.mediumText}>&lt;</Text>
      </TouchableOpacity>
    )
  }
}
