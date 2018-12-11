import { createStackNavigator } from 'react-navigation';

import BankScreen from '../screens/Bank/BankScreen';
import BankPasswordScreen from '../screens/Bank/BankPasswordScreen'
import BankOptionsScreen from '../screens/Bank/BankOptionsScreen'
import BankPayScreen from '../screens/Bank/BankPayScreen'

export default createStackNavigator({
  Bank: BankScreen,
  BankPassword: BankPasswordScreen,
  BankOptions: BankOptionsScreen,
  BankPay: BankPayScreen
});
