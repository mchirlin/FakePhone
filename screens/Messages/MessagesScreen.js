import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux'

import MessageItem from '../../components/Messages/MessageItem'
import { onThreadOpen } from '../../reducers/messageReducer'
import styles from '../../constants/styles'

class MessagesScreen extends Component {
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
    const {navigation, threads, onThreadOpen} = this.props

    return (
      <View style={styles.baseContainer}>
        <FlatList style={styles.list} data={threads}
          renderItem={({item}) => (
            <MessageItem
              thread={item}
              lastMessage={item.messages[item.messages.length - 1]}
              navigation={navigation}
              onPress={onThreadOpen}
            />
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
    threads: state.message.threads
  }
};

const mapDispatchToProps = {
  onThreadOpen
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
