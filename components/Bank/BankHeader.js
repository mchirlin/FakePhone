import React, { Component } from 'react'
import { Image, View } from 'react-native'

import styles from '../../constants/styles'

export default class BankHeader extends Component {

  render() {
    return (
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/images/bank-logo.png')}
        />
      </View>
    )
  }
}
