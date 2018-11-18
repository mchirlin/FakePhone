import React, {Component} from 'react';
import { View } from 'react-native';

import PhoneCallButton from './PhoneCallButton'
import PhoneBackButton from './PhoneBackButton'

import styles from '../../constants/styles'

export default class PhoneButtonRow extends Component {
  render() {
    const {onCallPress} = this.props
    const {onBackPress} = this.props
    const {navigation} = this.props

    return (
      <View style={styles.buttonLayout}>
        <View style={styles.buttonLeftContainer} />
        <PhoneCallButton onPressItem={onCallPress} navigation={navigation} />
        <View style={styles.buttonRightContainer}>
          <PhoneBackButton onPressItem={onBackPress}/>
        </View>
      </View>
    )
  }
}
