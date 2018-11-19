import { createSwitchNavigator } from 'react-navigation';

import HomeStack from './HomeStack'
import PhoneStack from './PhoneStack'
import MessagesStack from './MessagesStack'
import MailStack from './MailStack'
import MapsStack from './MapsStack'

export default createSwitchNavigator({
  Home: HomeStack,
  PhoneApp: PhoneStack,
  MessagesApp: MessagesStack,
  MailApp: MailStack,
  MapsApp: MapsStack
});
