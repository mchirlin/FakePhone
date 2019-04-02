import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'

import Mail from '../../components/Mail/Mail'
import styles from '../../constants/styles'

class MailDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // title: navigation.getParam('title'),
      title: 'Email',
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.mailHeader,
      headerTintColor: '#fff'
    }
  }

  render() {
    const {emails, navigation} = this.props
    const itemId = navigation.getParam('itemId', 0);

    const email = emails.filter((email) => {
      return email.id === itemId
    })[0];

    return (
      <View style={styles.mailDetailContainer}>
        <Mail email={email} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    emails: state.mail.emails
  }
};

export default connect(mapStateToProps)(MailDetailScreen);
