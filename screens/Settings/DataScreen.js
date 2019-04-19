import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { purgeStoredState } from 'redux-persist'
import { Updates } from 'expo'
import { Button } from 'react-native-elements';

import { persistConfig } from '../../reducers/index'
import styles from '../../constants/styles'

class DataScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Data',
      headerTitleStyle: styles.textLarge
    }
  }

  render() {
    return (
      <Button buttonStyle={styles.buttonDestruction} title="Reset Game" onPress={() => {
        Alert.alert(
          'Reset Game',
          'This will delete all data and restart the application',
          [
            {text: 'Cancel'},
            {
              text: 'OK',
              onPress: () => {
                purgeStoredState(persistConfig)
                Updates.reload()
              }
            },
          ]
        )
      }} />
    )
  }
}

const mapStateToProps = state => {
  return {

  }
};

export default connect(mapStateToProps)(DataScreen);
