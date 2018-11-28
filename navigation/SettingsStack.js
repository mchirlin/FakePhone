import { createStackNavigator } from 'react-navigation';

import SettingsScreen from '../screens/Settings/SettingsScreen';
import DataScreen from '../screens/Settings/DataScreen';

export default createStackNavigator({
  Settings: SettingsScreen,
  Data: DataScreen
});
