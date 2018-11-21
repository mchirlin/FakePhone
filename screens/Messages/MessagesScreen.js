import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import MessageItem from '../../components/Messages/MessageItem'
import styles from '../../constants/styles'

export default class MessagesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Messages',
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
    const {navigation} = this.props

    const data = [
      {
        id: '1',
        from: 'Ronny',
        time: 'Fri',
        body: 'Hello'
      },
      {
        id: '2',
        time: 'Thu',
        from: 'Michael',
        body: 'Is it me you\'re looking for?'
      },
      {
        id: '3',
        time: 'Wed',
        from: 'Michael',
        body: 'Is it me you\'re looking for?'
      },
      {
        id: '4',
        time: 'Wed',
        from: 'Michael',
        body: 'Is it me you\'re looking for?'
      },
      {
        id: '5',
        time: 'Tue',
        from: 'Michael',
        body: 'Is it me you\'re looking for?'
      },
    ]

    return (
      <View style={styles.baseContainer}>
        <FlatList style={styles.list} data={data}
          renderItem={({item}) => (
            <MessageItem item={item} navigation={navigation}/>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}
