import { createSwitchNavigator } from 'react-navigation';

import HomeStack from './HomeStack'
import PhoneStack from './PhoneStack'
import MessagesStack from './MessagesStack'
import MailStack from './MailStack'
import MapsStack from './MapsStack'
import BankStack from './BankStack'
import CalendarStack from './CalendarStack'
import CameraStack from './CameraStack'
import PhotosStack from './PhotosStack'

export default createSwitchNavigator({
  HomeStack: HomeStack,
  PhoneApp: PhoneStack,
  MessagesApp: MessagesStack,
  MailApp: MailStack,
  MapsApp: MapsStack,
  BankApp: BankStack,
  CalendarApp: CalendarStack,
  CameraApp: CameraStack,
  PhotosApp: PhotosStack
});
