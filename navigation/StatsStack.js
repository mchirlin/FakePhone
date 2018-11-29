import { createStackNavigator } from 'react-navigation';

import StatsScreen from '../screens/StatsScreen'
import WinScreen from '../screens/WinScreen'

export default createStackNavigator({
  Stats: StatsSceen,
  Win: WinScreen
});
