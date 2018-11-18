import { Audio } from 'expo'

import { sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sounds, sound0, soundp } from '../sounds'

const soundObject = new Audio.Sound();

try {
  switch (number) {
    case '1': {
      await soundObject.loadAsync(sound1);
      break;
    }
    case '2': {
      await soundObject.loadAsync(sound2);
      break;
    }
    case '3': {
      await soundObject.loadAsync(sound3);
      break;
    }
    case '4': {
      await soundObject.loadAsync(sound4);
      break;
    }
    case '5': {
      await soundObject.loadAsync(sound5);
      break;
    }
    case '6': {
      await soundObject.loadAsync(sound6);
      break;
    }
    case '7': {
      await soundObject.loadAsync(sound7);
      break;
    }
    case '8': {
      await soundObject.loadAsync(sound8);
      break;
    }
    case '9': {
      await soundObject.loadAsync(sound9);
      break;
    }
    case '*': {
      await soundObject.loadAsync(sounds);
      break;
    }
    case '0': {
      await soundObject.loadAsync(sound0);
      break;
    }
    case '#': {
      await soundObject.loadAsync(soundp);
      break;
    }
  }
  await soundObject.playAsync();
} catch (error) {
  // An error occurred!
}

// Call
const soundObject = new Audio.Sound();

try {
  await soundObject.loadAsync(ring);
  await soundObject.playAsync();
} catch (error) {

}
