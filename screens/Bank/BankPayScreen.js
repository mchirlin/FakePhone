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
    account: '',
    accountCorrect: false,
    amount: '',
    amountCorrect: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pay Someone',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.bankHeader,
      headerTintColor: '#fff'
    }
  }

  validateDetails(type, value, accountNumbers) {
    let results = accountNumbers.filter((accountNumber) => {
      switch (type) {
        case "account":
          return accountNumber.accountNumber == value;
        case "amount":
          return accountNumber.amount == value;
        case "both":
          return accountNumber.accountNumber == value[0] && accountNumber.amount == value[1];
      }

      return false;
    });

    if(results.length > 0) {
      return results[0];
    } else {
      return false;
    }
  }

  render() {
    const {accountNumbers, onEventActivate, navigation} = this.props
    return (
      <KeyboardAvoidingView
        behavior={'position'}
        keyboardVerticalOffset = {Header.HEIGHT}
        contentContainerStyle={styles.bankAvoid}>
        <BankHeader />
        <BankInput
          label="Account Number"
          onChange={(text) => {
            if(this.validateDetails("account", text, accountNumbers)) {
              this.setState({account: text, accountCorrect: 1})
            } else {
              this.setState({account: text, accountCorrect: 0})
            }
          }}
          value={this.state.account}
          keyboardType="numeric"
          inputStyle={
            this.state.accountCorrect == 0?
            styles.bankInput:
            [
              styles.textLargeBold,
              (this.state.accountCorrect == -1)?styles.textRed:styles.textGreen,
              styles.marginBottom
            ]
          }
        />
        <BankInput
          label="Amount"
          onChange={(text) => {
            if(this.validateDetails("amount", text, accountNumbers)) {
              this.setState({amount: text, amountCorrect: 1})
            } else {
              this.setState({amount: text, amountCorrect: 0})
            }
          }}
          value={this.state.amount}
          keyboardType="numeric"
          inputStyle={
            this.state.amountCorrect == 0?
            styles.bankInput:
            [
              styles.textLargeBold,
              (this.state.amountCorrect == -1)?styles.textRed:styles.textGreen,
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
              let result = this.validateDetails("both", [this.state.account, this.state.amount], accountNumbers);

              if(result) {
                if (result.triggers) {
                  result.triggers.map((trigger) => {
                    onEventActivate(trigger)
                  })
                }
                navigation.navigate('Home')
              } else {
                this.setState({accountCorrect: -1, amountCorrect: -1})
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
