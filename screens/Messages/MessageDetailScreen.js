import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux'
import { Avatar } from 'react-native-elements'

import Message from '../../components/Messages/Message'
import MessageDecision from '../../components/Messages/MessageDecision'
import { onOptionChoose } from '../../reducers/decisionReducer'
import { onEventActivate } from '../../reducers/eventReducer'
import { onMessageAdd, onDecisionRemove } from '../../reducers/messageReducer'
import { onPenaltyAdd } from '../../reducers/homeReducer'
import { onThreadOpen } from '../../reducers/messageReducer'
import styles from '../../constants/styles'

class MessagesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const contact = navigation.getParam('contact', 0);

    return {
      headerStyle: [
        styles.messagesHeader,
        {height: 70}
      ],
      headerTintColor: 'white',
      headerTitle: (
        <View style={{alignItems: 'center'}}>
          <Avatar
            containerStyle={{marginBottom: 5}}
            size="small"
            rounded
            title={contact.initials}
            activeOpacity={0.7}
            source={contact.avatar?{uri: contact.avatar}:null}
          />
          <Text style={[styles.textMedium, styles.textWhite]}>{contact.name}</Text>
        </View>
      )
    }
  }

  renderSeparator = () => {
    return (
      <View style={{marginBottom: 10}} />
    )
  }

  getItemLayout = (data, index) => (
    { length: 10, offset: 10 * index, index }
  );

  componentDidUpdate() {
    const { threads, onThreadOpen, navigation } = this.props;
    const itemId = navigation.getParam('itemId', 0);

    const thread = threads.filter((thread) => {
      return thread.id === itemId
    })[0];

    if (!thread.messages.filter(message => message.visible).every(message => message.read)) {
      onThreadOpen(itemId);
    }
  }

  render() {
    const {
      threads,
      decisions,
      navigation,
      onOptionChoose,
      onMessageAdd,
      onDecisionRemove,
      onEventActivate,
      onPenaltyAdd
    } = this.props
    const itemId = navigation.getParam('itemId', 0);

    const thread = threads.filter((thread) => {
      return thread.id === itemId
    })[0];

    const messages = thread.messages.filter(message => message.visible).reverse();
    let decision = null;
    if (messages.length > 0) {
      decision = decisions.filter((decision) => {
        return decision.id === messages[0].decisionId;
      })[0];
    }

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          contentContainerStyle={{ padding: 10 }}
          style={[styles.messagesList, {flex:1}]}
          data={messages}
          renderItem={({item}) => (
            <Message message={item} />
          )}
          inverted
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {
          decision?(
            <MessageDecision
              decision={decision}
              onOptionChoose={onOptionChoose}
              onDecisionRemove={onDecisionRemove}
              onMessageAdd={onMessageAdd}
              onEventActivate={onEventActivate}
              onPenaltyAdd={onPenaltyAdd}
              threadId={thread.id}
              messageId={messages[messages.length - 1].id}
            />
          ):<View style={{marginBottom: 50}}/>
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    threads: state.message.threads,
    decisions: state.decision.decisions
  }
};

const mapDispatchToProps = {
  onOptionChoose,
  onDecisionRemove,
  onMessageAdd,
  onEventActivate,
  onPenaltyAdd,
  onThreadOpen
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
