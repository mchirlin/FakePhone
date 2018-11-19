import { createStackNavigator } from 'react-navigation';

import MessagesScreen from '../screens/Messages/MessagesScreen';
import MessageDetailScreen from '../screens/Messages/MessageDetailScreen';

export default createStackNavigator({
  Messages: MessagesScreen,
  MessageDetail: MessageDetailScreen,
});
