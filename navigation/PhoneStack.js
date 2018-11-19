import React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation';

import PhoneScreen from '../screens/Phone/PhoneScreen';
import PhoneCallScreen from '../screens/Phone/PhoneCallScreen';
import styles from '../constants/styles'

export default createStackNavigator(
  {
    Phone: PhoneScreen,
    PhoneCall: PhoneCallScreen
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      }
    })
  }
)
