import React, {Component} from 'react';
import { View } from 'react-native';

import PhoneCallButton from './PhoneCallButton'
import PhoneBackButton from './PhoneBackButton'

import styles from '../../constants/styles'

export default class PhoneButtonRow extends Component {
  render() {
    const {
      onCallPress,
      onBackPress,
      onEventActivate,
      navigation,
      number,
      numbers
    } = this.props

    return (
      <View style={styles.buttonLayout}>
        <View style={styles.buttonLeftContainer} />
        <PhoneCallButton
          onPress={onCallPress}
          navigation={navigation}
          number={number}
          numbers={numbers}
          onEventActivate={onEventActivate}
        />
        <View style={styles.buttonRightContainer}>
          <PhoneBackButton onPressItem={onBackPress}/>
        </View>
      </View>
    )
  }
}
