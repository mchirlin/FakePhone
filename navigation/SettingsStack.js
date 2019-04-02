import { createStackNavigator } from 'react-navigation';

import SettingsScreen from '../screens/Settings/SettingsScreen';
import DataScreen from '../screens/Settings/DataScreen';
import InstructionsScreen from '../screens/Settings/InstructionsScreen'

export default createStackNavigator({
  Settings: SettingsScreen,
  Data: DataScreen,
  Instructions: InstructionsScreen
});
