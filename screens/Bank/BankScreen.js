import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux'
import { Button, Input } from 'react-native-elements';

import HomeButton from '../../components/Common/HomeButton'
import BankHeader from '../../components/Bank/BankHeader'
import BankInput from '../../components/Bank/BankInput'
import {onUsernameUpdate, onPasswordUpdate} from '../../reducers/bankReducer'
import styles from '../../constants/styles'

class BankScreen extends Component {
  componentWillUnmount() {
    const {onPasswordUpdate} = this.props

    onPasswordUpdate('')
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Bank',
      headerLeft: (
        <HomeButton navigation={navigation} color="#fff" />
      ),
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.bankHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    const {username, password, navigation} = this.props
    const {onUsernameUpdate, onPasswordUpdate} = this.props
    return (
      <View style={styles.bankContainer}>
        <BankHeader />
        <BankInput
          placeholder='Username'
          icon={{ type: 'font-awesome', name: 'user' }}
          onChange={(text) => onUsernameUpdate(text)}
          value={username?username:''}
        />
        <BankInput
          placeholder='Password'
          icon={{ type: 'font-awesome', name: 'lock' }}
          onChange={(text) => onPasswordUpdate(text)}
          value={password?password:''}
        />
        <View style={[styles.rowLayout, {marginTop: 10}]}>
          <Button
            raised
            buttonStyle={{backgroundColor:"#666"}}
            title="Forgot password"
            titleStyle={styles.textLarge}
            onPress={() => {navigation.navigate('BankPassword')}}/>
          <Button raised title="Submit" titleStyle={styles.textLarge} onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.bank.username,
    password: state.bank.password
  }
};

const mapDispatchToProps = {
  onUsernameUpdate,
  onPasswordUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(BankScreen);
