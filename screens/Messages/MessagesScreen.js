import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux'

import MessageListItem from '../../components/Messages/MessageListItem'
import HomeButton from '../../components/Common/HomeButton'
import { onThreadOpen } from '../../reducers/messageReducer'
import styles from '../../constants/styles'

class MessagesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Messages',
      headerLeft: (
        <HomeButton navigation={navigation} color="#fff" />
      ),
      headerTitleStyle: styles.textLarge,
      headerStyle: styles.messagesHeader,
      headerTintColor: '#fff'
    }
  }

  renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    )
  }
  render() {
    const {navigation, threads, onThreadOpen} = this.props;

    return (
      <View style={[styles.lightContainer, styles.centeredContainer]}>
        <FlatList style={styles.list} data={threads.filter(thread => thread.visible)}
          renderItem={({item}) => (
            <MessageListItem
              thread={item}
              lastMessage={item.messages.slice().reverse().find(message => message.visible)}
              navigation={navigation}
              onPress={onThreadOpen}
            />
          )}
          keyExtractor={(item, index) => 'list-item' + item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
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
