import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import MailItem from '../../components/Mail/MailItem'
import styles from '../../constants/styles'

import { onMailAdd, onMailRead } from '../../reducers/mailReducer'

class MailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mail',
      headerLeft: (
        <TouchableOpacity style={styles.homeIcon} onPress={() => navigation.navigate('Home')}>
          <Entypo name="home" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.textLarge
    }
  }
  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    )
  }
  render() {
    const {navigation, emails} = this.props

    return (
      <View style={styles.baseContainer}>
        <FlatList data={emails}
          renderItem={({item}) => (
            <MailItem item={item} navigation={navigation}/>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
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
  onMailRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(MailScreen);
