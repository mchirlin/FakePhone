import React, {Component} from 'react';
import { View } from 'react-native';

import PhoneButton from './PhoneButton'

import styles from '../../constants/styles'

export default class PhoneButtonRow extends Component {
  render() {
    const {values} = this.props
    const {letters} = this.props
    const {onPressItem} = this.props

    return (
      <View style={styles.buttonLayout}>
        <PhoneButton number={values[0]} letters={letters[0]} onPressItem={onPressItem}/>
        <PhoneButton number={values[1]} letters={letters[1]} onPressItem={onPressItem}/>
        <PhoneButton number={values[2]} letters={letters[2]} onPressItem={onPressItem}/>
      </View>
    )
  }
}
