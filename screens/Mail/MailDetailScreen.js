import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux'

import styles from '../../constants/styles'

class MailDetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      // title: navigation.getParam('title'),
      title: 'Email',
      headerTitleStyle: styles.textLarge
    }
  }

  // componentDidMount() {
  //   const {navigation, selectedEmail, emails} = this.props
  //   navigation.setParams({title: emails[selectedEmail].subject})
  // }

  render() {
    const {selectedEmail, emails} = this.props

    return (
      <View style={styles.mailDetailContainer}>
        <View style={styles.mailDetailBackground}>
          <Text style={styles.textLarge}>{emails[selectedEmail].subject}</Text>
          <View style={styles.listSeparator} />
          <Text style={styles.textMedium}>{emails[selectedEmail].from}</Text>
          <View style={styles.rowLayout}>
            <Text style={styles.textMedium}>to: {emails[selectedEmail].to}</Text>
            <Text style={[styles.textMedium, styles.textBlue]}>{emails[selectedEmail].time}</Text>
          </View>
          <Text style={[styles.mailBody, styles.textMedium]}>{emails[selectedEmail].body}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedEmail: state.mail.selectedEmail,
    emails: state.mail.emails
  }
};

export default connect(mapStateToProps)(MailDetailScreen);
