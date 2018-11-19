import { createStackNavigator } from 'react-navigation';

import MailScreen from '../screens/Mail/MailScreen';
import MailDetailScreen from '../screens/Mail/MailDetailScreen';

export default createStackNavigator({
  Mail: MailScreen,
  MailDetail: MailDetailScreen,
});
