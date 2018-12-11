import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import { Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

import BankHeader from '../../components/Bank/BankHeader'
import BankInput from '../../components/Bank/BankInput'
import { onEventActivate } from '../../reducers/eventReducer'
import styles from '../../constants/styles'

class BankPayScreen extends Component {

  state = {
    correct: true,
    account: '',
    amount: ''
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pay Someone',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.bankHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    const {accountNumbers, onEventActivate, navigation} = this.props
    return (
      <KeyboardAvoidingView
        behavior={'position'}
        keyboardVerticalOffset = {Header.HEIGHT}
        contentContainerStyle={styles.avoidingView}>
        <BankHeader />
        <BankInput
          label="Account Number"
          onChange={(text) => {
            this.setState({correct: true, account: text})
          }}
          value={this.state.account}
          keyboardType="numeric"
          inputStyle={
            this.state.correct?
            styles.bankInput:
            [
              styles.textLargeBold,
              styles.textRed,
              styles.marginBottom
            ]
          }
        />
        <BankInput
          label="Amount"
          onChange={(text) => {
            this.setState({correct: true, amount: text})
          }}
          value={this.state.amount}
          keyboardType="numeric"
          inputStyle={
            this.state.correct?
            styles.bankInput:
            [
              styles.textLargeBold,
              styles.textRed,
              styles.marginBottom
            ]
          }
        />
        <View style={[styles.rowLayout, {marginTop: 10}]}>
          <Button
            title="Send"
            raised
            titleStyle={styles.textLarge}
            buttonStyle={styles.buttonSubmit}
            onPress={() => {
              let results = accountNumbers.filter((accountNumber) => {
                return accountNumber.accountNumber === this.state.account &&
                  accountNumber.amount == this.state.amount
              })
              console.log(results)
              if(results.length > 0) {
                let result = results[0]
                if (result.triggers) {
                  result.triggers.map((trigger) => {
                    onEventActivate(trigger.id)
                  })
                }
                navigation.navigate('Home')
              } else {
                this.setState({correct: false})
              }
            }} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    accountNumbers: state.bank.accountNumbers
  }
};

const mapDispatchToProps = {
  onEventActivate
}

export default connect(mapStateToProps, mapDispatchToProps)(BankPayScreen);
