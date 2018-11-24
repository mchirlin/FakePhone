import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Input, Button } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';

import {onAnswerUpdate} from '../../reducers/bankReducer'
import styles from '../../constants/styles'

class BankPasswordScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Forgot Password',
      headerTitleStyle: styles.textLarge
    }
  }

  render() {
    const {questions, answers} = this.props
    const {onAnswerUpdate} = this.props
    return (
      <View>
        {
          questions.map((question, index) => (
            <Input
              key={question.id}
              label={question.question}
              labelStyle={styles.textMedium}
              onChangeText={(text) => {
                onAnswerUpdate(text, index)
              }}
              value={question.attempt}
              inputStyle={
                question.attempt===question.answer?
                [
                  styles.textLargeBold,
                  styles.textGreen
                ]:
                styles.textLarge
              }
            />
          ))
        }
        <Button title="Submit" titleStyle={styles.textLarge} onPress={() => {}} />
      </View>
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
