import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo'

import PhoneNumber from '../../components/Phone/PhoneNumber'
import PhoneButtonRow from '../../components/Phone/PhoneButtonRow'
import PhoneButtonLastRow from '../../components/Phone/PhoneButtonLastRow'
import HomeButton from '../../components/Common/HomeButton'
import { tones, rings } from '../../constants/sounds'
import { onNumberAdd, onNumberDelete, onCallStart, onSoundEnd } from '../../reducers/phoneReducer'
import { onEventActivate } from '../../reducers/eventReducer'
import styles from '../../constants/styles'

class PhoneScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Phone',
      headerLeft: (
        <HomeButton navigation={navigation} />
      ),
      headerTitleStyle: styles.textLarge
    }
  }

  constructor(props) {
    super(props)

    this.onPlaybackStatusUpdate = this.onPlaybackStatusUpdate.bind(this);
  }

  componentDidMount() {
    this.soundObject = new Audio.Sound()
    this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
  }

  async componentDidUpdate() {
    const {isPlaying, audioTrack} = this.props

    if (isPlaying) {
      // try {
        await this.soundObject.unloadAsync()
        await this.soundObject.loadAsync(audioTrack)
        await this.soundObject.playAsync()
      // } catch (error) {
      //   // Handle error
      // }
    } else {
      await this.soundObject.unloadAsync()
    }
  }

  componentWillUnmount() {
    this.soundObject = null
  }

  render() {
    /* Props */
    const {phoneNumber, phoneNumbers} = this.props

    /* Dispatches */
    const {onNumberAdd, onNumberDelete, onCallStart, onEventActivate} = this.props

    /* Navigation */
    const {navigation} = this.props

    return (
      <View style={styles.lightContainer}>
        <PhoneNumber color='textBlack' number={phoneNumber} />
        <PhoneButtonRow values={['1','2','3']} letters= {['','ABC','DEF']} onPressItem={onNumberAdd}/>
        <PhoneButtonRow values={['4','5','6']} letters= {['GHI','JKL','MNO']} onPressItem={onNumberAdd} />
        <PhoneButtonRow values={['7','8','9']} letters= {['PQRS','TUV','WXYZ']} onPressItem={onNumberAdd} />
        <PhoneButtonRow values={['*','0','#']} letters= {['','+','']} onPressItem={onNumberAdd} />
        <PhoneButtonLastRow
          numbers={phoneNumbers}
          number={phoneNumber}
          navigation={navigation}
          onBackPress={onNumberDelete}
          onCallPress={onCallStart}
          onEventActivate={onEventActivate} />
      </View>
    );
  }

  onPlaybackStatusUpdate (playbackStatus) {
    const {onSoundEnd} = this.props
    if (playbackStatus.didJustFinish) {
      onSoundEnd()
    }
  }
}

const mapAudioTrackToSound = (audioTrack, phoneNumbers) => {

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

const mapStateToProps = state => {
  const phoneNumber = state.phone.phoneNumber?state.phone.phoneNumber:''
  return {
    phoneNumber: phoneNumber,
    audioTrack: mapAudioTrackToSound(state.phone.audioTrack, state.phone.phoneNumbers),
    isPlaying: state.phone.isPlaying,
    phoneNumbers: state.phone.phoneNumbers
  }
};

const mapDispatchToProps = {
  onNumberAdd,
  onNumberDelete,
  onCallStart,
  onSoundEnd,
  onEventActivate
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneScreen);
