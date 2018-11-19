import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, StyleSheet, Button } from 'react-native';

import MailItem from '../../components/Mail/MailItem'

import styles from '../../constants/styles'

export default class MailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mail',
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Home"
          color="#000"
        />
      )
    }
  }
  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    )
  }
  render() {
    const {navigation} = this.props

    const data = [
      {
        id: '1',
        from: 'Ronny',
        time: 'Fri',
        subject: 'First',
        body: 'Hello'
      },
      {
        id: '2',
        time: 'Thu',
        from: 'Michael',
        subject: 'Second',
        body: 'Is it me you\'re looking for?'
      },
      {
        id: '3',
        time: 'Wed',
        from: 'Michael',
        subject: 'Third',
        body: 'Is it me you\'re looking for?'
      },
      {
        id: '4',
        time: 'Wed',
        from: 'Michael',
        subject: 'Fourth',
        body: 'Is it me you\'re looking for?'
      },
      {
        id: '5',
        time: 'Tue',
        from: 'Michael',
        subject: 'Fifth',
        body: 'Is it me you\'re looking for?'
      },
    ]

    return (
      <View style={styles.baseContainer}>
        <FlatList data={data}
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
