import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import styles from '../../constants/styles'

export default class HomeButton extends Component {
  render() {
    const {navigation, color} = this.props

    return (
      <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
        <Entypo name="home" size={30} color={color?color:"#000"} />
      </TouchableOpacity>
    )
  }
}
