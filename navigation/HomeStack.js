import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const height = layout.initHeight
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })

      return { transform: [ { translateY } ] }
    },
  }
}

export default createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    transitionConfig: transitionConfig
  }
);
