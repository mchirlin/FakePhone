import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { Audio } from 'expo'

import PhoneNumber from '../../components/Phone/PhoneNumber'
import PhoneButtonRow from '../../components/Phone/PhoneButtonRow'
import PhoneButtonLastRow from '../../components/Phone/PhoneButtonLastRow'

import { tones, rings } from '../../constants/sounds'

import { onNumberAdd, onNumberDelete, onCallStart, onSoundEnd } from '../../reducers/phoneReducer'

import styles from '../../constants/styles'

class PhoneScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props)

    this._onPlaybackStatusUpdate = this._onPlaybackStatusUpdate.bind(this);
  }

  componentDidMount() {
    this.soundObject = new Audio.Sound()
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
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
    const {phoneNumber} = this.props

    /* Dispatches */
    const {onNumberAdd} = this.props
    const {onNumberDelete} = this.props
    const {onCallStart} = this.props

    /* Navigation */
    const {navigation} = this.props

    return (
      <View style={styles.lightContainer}>
        <PhoneNumber color='textBlack' number={phoneNumber} />
        <PhoneButtonRow values={['1','2','3']} letters= {['','ABC','DEF']} onPressItem={onNumberAdd}/>
        <PhoneButtonRow values={['4','5','6']} letters= {['GHI','JKL','MNO']} onPressItem={onNumberAdd} />
        <PhoneButtonRow values={['7','8','9']} letters= {['PQRS','TUV','WXYZ']} onPressItem={onNumberAdd} />
        <PhoneButtonRow values={['*','0','#']} letters= {['','+','']} onPressItem={onNumberAdd} />
        <PhoneButtonLastRow navigation={navigation} onBackPress={onNumberDelete} onCallPress={onCallStart} />
      </View>
    );
  }

  _onPlaybackStatusUpdate (playbackStatus) {
    const {onSoundEnd} = this.props
    if (playbackStatus.didJustFinish) {
      onSoundEnd()
    }
  }
}

const mapAudioTrackToSound = (audioTrack) => {
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
    default: return rings[0]
  }
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.phoneNumber,
    audioTrack: mapAudioTrackToSound(state.audioTrack),
    isPlaying: state.isPlaying
  }
};

const mapDispatchToProps = {
  onNumberAdd,
  onNumberDelete,
  onCallStart,
  onSoundEnd
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneScreen);
