import { createStackNavigator } from 'react-navigation';

import BankScreen from '../screens/Bank/BankScreen';
import BankPasswordScreen from '../screens/Bank/BankPasswordScreen'

export default createStackNavigator({
  Bank: BankScreen,
  BankPassword: BankPasswordScreen
});
