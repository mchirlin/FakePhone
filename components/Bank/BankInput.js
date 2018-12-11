import React, { Component } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements';

import styles from '../../constants/styles'

export default class BankInput extends Component {

  render() {
    const {label, keyboardType, placeholder, icon, value, onChange, inputStyle} = this.props

    return (
      <Input
        keyboardType={keyboardType}
        label={label}
        labelStyle={styles.bankLabel}
        leftIcon={icon}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        inputStyle={inputStyle?inputStyle:styles.bankInput}
      />
    )
  }
}
