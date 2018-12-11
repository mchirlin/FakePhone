import React, { Component } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Header } from 'react-navigation'
import { Input, Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

import BankHeader from '../../components/Bank/BankHeader'
import BankInput from '../../components/Bank/BankInput'
import {onAnswerUpdate} from '../../reducers/bankReducer'
import styles from '../../constants/styles'

class BankPasswordScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Forgot Password',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.bankHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    const {questions, answers, navigation} = this.props
    const {onAnswerUpdate} = this.props
    return (
      <KeyboardAvoidingView
        behavior={'position'}
        keyboardVerticalOffset = {Header.HEIGHT}
        contentContainerStyle={styles.avoidingView}>
        <BankHeader />
        {
          questions.map((question, index) => (
            <BankInput
              key={question.id}
              label={question.question}
              onChange={(text) => {
                onAnswerUpdate(text, index)
              }}
              value={question.attempt}
              inputStyle={
                question.attempt===question.answer?
                [
                  styles.textLargeBold,
                  styles.textGreen,
                  styles.marginBottom
                ]:
                styles.bankInput
              }
            />
          ))
        }
        <View style={[styles.rowLayout, {marginTop: 10}]}>
          <Button
            raised
            title="Submit"
            titleStyle={styles.textLarge}
            onPress={() => {
              if (questions.filter((question) => {
                  return question.attempt === question.answer
                }).length == questions.length) {
                console.log('Right');
                navigation.navigate('BankOptions');
              } else {
                console.log('Wrong');
              }
            }} />
          </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.bank.questions
  }
};

const mapDispatchToProps = {
  onAnswerUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(BankPasswordScreen);
