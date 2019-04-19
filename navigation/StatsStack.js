import { createStackNavigator } from 'react-navigation';

import StatsScreen from '../screens/Stats/StatsScreen'
import TimeDetailScreen from '../screens/Stats/TimeDetailScreen'
import WinScreen from '../screens/Stats/WinScreen'

export default createStackNavigator({
  Stats: StatsScreen,
  TimeDetail: TimeDetailScreen,
  Win: WinScreen
});
