import React, { Component } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { purgeStoredState } from 'redux-persist'
import { Util } from 'expo'

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
      <Button title="Delete all data" onPress={() => {
        Alert.alert(
          'Delete all data',
          'This will delete all data and restart the application',
          [
            {text: 'Cancel'},
            {
              text: 'OK',
              onPress: () => {
                purgeStoredState(persistConfig)
                Util.reload()
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
