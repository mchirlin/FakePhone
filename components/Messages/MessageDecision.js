import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ButtonGroup, Button, Divider } from 'react-native-elements';

import styles from '../../constants/styles'

export default class MessageDecision extends Component {

  render() {
    const {
      threadId,
      messageId,
      decision,
      onChooseOption,
      onMessageAdd,
      onDecisionRemove,
      onEventActivate
    } = this.props

    const buttons = decision.options.map(item => item.text);
    const selectedStatuses = decision.options.map((item, index) => item.status=="selected"?index:null);
    const selectedIndices = selectedStatuses.filter(item => item != null);

    return (
      <View>
        <Divider style={styles.divider} />
        <ButtonGroup
          containerStyle={{marginTop:25, marginBottom:25}}
          buttons={buttons}
          buttonStyle={styles.buttonOption}
          textStyle={[styles.textLarge, styles.textWhite]}
          disabled={selectedIndices}
          disabledSelectedStyle={{backgroundColor: "#ddd"}}
          onPress={(selectedIndex) => {
            onChooseOption(decision.id, decision.options[selectedIndex].id);
            onMessageAdd(threadId, {
              isMe: true,
              message: decision.options[selectedIndex].response,
              read: true,
              visible: true
            });
            onDecisionRemove(threadId, messageId);
            decision.options[selectedIndex].triggers.map((trigger) => {
              onEventActivate(trigger.id)
            });
          }}
        />
      </View>
    )
  }
}
