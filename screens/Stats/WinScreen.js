import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import styles from '../../constants/styles'
import { formatSeconds } from '../../reducers/functions'

class WinScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {navigation, timeStart, timeEnd, locationsFound, locationsTotal} = this.props

    return (
      <View style={styles.winContainer}>
        <Text style={styles.winText}>You Win!!</Text>
        <Button
          title="View Stats"
          raised
          titleStyle={styles.textLarge}
          onPress={() => {
            navigation.navigate('Stats')
          }} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeStart: state.home.timeStart,
    timeEnd: state.home.timeEnd,
    locationsFound: state.map.markers.filter(marker => marker.found && marker.visible).length,
    locationsTotal: state.map.locationsTotal
  }
};

export default connect(mapStateToProps)(WinScreen);
