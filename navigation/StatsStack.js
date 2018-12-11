import { createStackNavigator } from 'react-navigation';

import StatsScreen from '../screens/Stats/StatsScreen'
import WinScreen from '../screens/Stats/WinScreen'

export default createStackNavigator({
  Stats: StatsScreen,
  Win: WinScreen
});
