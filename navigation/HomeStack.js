import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import PhoneStack from './PhoneStack'
import MessagesStack from './MessagesStack'
import MailStack from './MailStack'
import MapsStack from './MapsStack'
import BankStack from './BankStack'
import CalendarStack from './CalendarStack'
import CameraStack from './CameraStack'
import PhotosStack from './PhotosStack'
import SettingsStack from './SettingsStack'

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scale = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleX: scale },
      { scaleY: scale }
    ]
  };
};

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};

let SlideUp = (index, position, width, height) => {

  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })

  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0]
  })

  return { transform: [ { translateY } ] }
}

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const height = layout.initHeight
      const { index, route } = scene
      return CollapseExpand(index, position)
    }
  }
}

export default createStackNavigator(
  {
    Home: HomeScreen,
    PhoneApp: PhoneStack,
    MessagesApp: MessagesStack,
    MailApp: MailStack,
    MapsApp: MapsStack,
    BankApp: BankStack,
    CalendarApp: CalendarStack,
    CameraApp: CameraStack,
    PhotosApp: PhotosStack,
    SettingsApp: SettingsStack
  },
  {
    headerMode: 'none',
    transitionConfig: transitionConfig
  }
);
