import { Audio } from 'expo'

export const tones = [
  require('../assets/sounds/1.wav'),
  require('../assets/sounds/2.wav'),
  require('../assets/sounds/3.wav'),
  require('../assets/sounds/4.wav'),
  require('../assets/sounds/5.wav'),
  require('../assets/sounds/6.wav'),
  require('../assets/sounds/7.wav'),
  require('../assets/sounds/8.wav'),
  require('../assets/sounds/9.wav'),
  require('../assets/sounds/s.wav'),
  require('../assets/sounds/0.wav'),
  require('../assets/sounds/p.wav')
]
export const rings = [
  require('../assets/sounds/ring.mp3')
]

export const settings = {
  playsInSilentModeIOS: true,
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  playThroughEarpieceAndroid: true
}
