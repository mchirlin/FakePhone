import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux'
import { Button, Input } from 'react-native-elements';

import HomeButton from '../../components/Common/HomeButton'
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
      <View style={styles.centeredContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 200, height: 200}}
            source={require('../../assets/images/bank-logo.png')}
          />
        </View>
        <Input
          inputStyle={styles.textLarge}
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text) => onUsernameUpdate(text)}
          value={username?username:''}
        />
        <Input
          inputStyle={styles.textLarge}
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => onPasswordUpdate(text)}
          value={password?password:''}
        />
        <View style={[styles.rowLayout, {marginTop: 10}]}>
          <Button
            buttonStyle={{backgroundColor:"#666"}}
            title="Forgot password"
            titleStyle={styles.textLarge}
            onPress={() => {navigation.navigate('BankPassword')}}/>
          <Button title="Submit" titleStyle={styles.textLarge} onPress={() => {}} />
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
