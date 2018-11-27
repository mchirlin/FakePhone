import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'

import Message from '../../components/Messages/Message'
import styles from '../../constants/styles'

class MessagesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const contact = navigation.getParam('contact', 0)

    return {
      headerStyle: {
        height: 60
      },
      headerTitle: (
        <View style={{alignItems: 'center'}}>
          <Avatar
            // containerStyle={{flex: 1}}
            size="small"
            rounded
            title={contact.initials}
            activeOpacity={0.7}
          />
          <Text style={styles.textMedium}>{contact.name}</Text>
        </View>
      )
    }
  }

  render() {
    const { threads, navigation } = this.props
    const itemId = navigation.getParam('itemId', 0);

    const thread = threads[itemId]

    return (
      <FlatList style={styles.messagesList}
        data={thread.messages}
        renderItem={({item}) => (
          <Message message={item} />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    threads: state.message.threads
  }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
