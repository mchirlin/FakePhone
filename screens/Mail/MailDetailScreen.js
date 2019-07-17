import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux'

import Mail from '../../components/Mail/Mail'
import styles from '../../constants/styles'

class MailDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('from'),
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
      <ScrollView  style={styles.mailDetailContainer}>
        <Mail email={email} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    emails: state.mail.emails
  }
};

export default connect(mapStateToProps)(MailDetailScreen);
