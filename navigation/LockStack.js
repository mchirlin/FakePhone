import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation';

import LockScreen from '../screens/LockScreen'

export default createStackNavigator(
  {
    Lock: LockScreen
  }
);
