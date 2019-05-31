import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo'

import PhoneNumber from '../../components/Phone/PhoneNumber'
import PhoneButtonRow from '../../components/Phone/PhoneButtonRow'
import PhoneButtonLastRow from '../../components/Phone/PhoneButtonLastRow'
import HomeButton from '../../components/Common/HomeButton'
import { settings } from '../../constants/sounds'
import { mapAudioTrackToSound } from '../../functions/soundFunctions'
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
    Audio.setAudioModeAsync(settings);
    this.soundObject = new Audio.Sound()
    this.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
  }

  async componentDidUpdate() {
    const {isPlaying, audioTrack} = this.props

    if (isPlaying) {
      try {
        await this.soundObject.unloadAsync()
        await this.soundObject.loadAsync(audioTrack)
        await this.soundObject.playAsync()
      } catch (error) {
        // Handle error
      }
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
      <View style={styles.baseContainer}>
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
      onSoundEnd();
    }
  }
}

const mapStateToProps = state => {
  const phoneNumber = state.phone.phoneNumber?state.phone.phoneNumber:''

  const track = mapAudioTrackToSound(state.phone.audioTrack, state.phone.phoneNumbers);

  console.log("Audio Track", state.phone.audioTrack);

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
