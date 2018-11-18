import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import styles from '../../constants/styles'

export default class PhoneEndButton extends Component {
  render() {
    const {number} = this.props;
    const {onPressItem} = this.props;
    const {navigation} = this.props;

    return (
      <TouchableOpacity style={[styles.button, styles.buttonEnd]} onPress={() => {
          navigation.goBack()
          onPressItem()
        }}>
        <Entypo name="phone" size={50} color="#333" />
      </TouchableOpacity>
    )
  }
}
