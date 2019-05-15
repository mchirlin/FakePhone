import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import styles from '../../constants/styles'

export default class PhoneCallButton extends Component {
  render() {
    const {
      number,
      numbers,
      onPress,
      onEventActivate,
      navigation
    } = this.props;

    return (
      <TouchableOpacity style={[styles.button, styles.buttonCall]} onPress={() => {
          if(number.length > 0) {
            navigation.navigate('PhoneCall')
            onPress(number)

            // If phoneNumber is in list of phoneNumbers then activate all triggers
            const phoneNumber = numbers.find((item) => {
              return item.number === number
            })

            if (phoneNumber) {
              phoneNumber.triggers.map((trigger) => {
                onEventActivate(trigger);
              })
            }
          }
        }}>
        <Entypo name="phone" size={50} color="#fff" />
      </TouchableOpacity>
    )
  }
}
