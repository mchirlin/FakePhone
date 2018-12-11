import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

import BankHeader from '../../components/Bank/BankHeader'
import styles from '../../constants/styles'

class BankPayScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pay Someone',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.bankHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    const {questions, answers, navigation} = this.props
    const {onAnswerUpdate} = this.props
    return (
      <View style={styles.bankContainer}>
        <BankHeader />
        <View style={styles.rowLayout} >
          <Button
            raised
            icon={{name: 'dollar', color: 'white', type: 'font-awesome'}}
            title='View Balance' />
          <Button
            raised
            icon={{name: 'send', color: 'white'}}
            title='Pay Anyone'
            onPress={() => {navigation.navigate('BankPay')}}/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(BankPayScreen);
