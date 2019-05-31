import { rings, tones } from '../constants/sounds'

export function mapAudioTrackToSound(audioTrack, phoneNumbers) {

  const mappedNumber = phoneNumbers.find((phoneNumber) => {
    if (phoneNumber.number === audioTrack) {
      return phoneNumber
    }
  })

  if (mappedNumber) return mappedNumber

  switch (audioTrack) {
    case '1': return tones[0]
    case '2': return tones[1]
    case '3': return tones[2]
    case '4': return tones[3]
    case '5': return tones[4]
    case '6': return tones[5]
    case '7': return tones[6]
    case '8': return tones[7]
    case '9': return tones[8]
    case '*': return tones[9]
    case '0': return tones[10]
    case '#': return tones[11]
    case '999': return rings[1]
    default: return rings[0]
  }
}
