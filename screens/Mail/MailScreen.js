import React, { Component } from 'react';
import { Button,  Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import MailListItem from '../../components/Mail/MailListItem'
import HomeButton from '../../components/Common/HomeButton'
import styles from '../../constants/styles'

import { onMailAdd, onMailOpen } from '../../reducers/mailReducer'

class MailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mail',
      headerLeft: (
        <HomeButton navigation={navigation} color="#fff" />
      ),
      headerStyle: styles.mailHeader,
      headerTintColor: '#fff',
      headerTitleStyle: styles.textLarge
    }
  }
  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    )
  }

  render() {
    const {navigation, emails, onMailAdd, onMailOpen} = this.props

    return (
      <View style={[styles.lightContainer, styles.centeredContainer]}>
        <FlatList data={emails}
          renderItem={({item}) => (
            <MailListItem item={item} navigation={navigation} onPress={onMailOpen}/>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    emails: state.mail.emails
  }
};

const mapDispatchToProps = {
  onMailAdd,
  onMailOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(MailScreen);
