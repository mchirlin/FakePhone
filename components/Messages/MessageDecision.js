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
      onOptionChoose,
      onMessageAdd,
      onDecisionRemove,
      onEventActivate,
      onDelayAdd
    } = this.props

    const buttons = decision.options.map(item => item.text);
    const selectedStatuses = decision.options.map((item, index) => item.status=="selected"?index:null);
    const selectedIndices = selectedStatuses.filter(item => item != null);

    function getHintDelay(index) {
      let delay;
      let name;
      switch (index) {
        case 0:
          delay = 30000;
          name = "Small Hint";
          break;
        case 1:
          delay = 120000;
          name = "Medium Hint";
          break;
        case 2:
          delay = 300000;
          name = "Big Hint";
          break;
        default:
          delay = 1000000;
          name = "Unknown Hint";
      }

      return {
        delay: delay,
        name: name
      };
    }

    return buttons.length > 0 ?
     (
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
            onOptionChoose(decision.id, decision.options[selectedIndex].id);
            onMessageAdd(threadId, {
              isMe: true,
              message: decision.options[selectedIndex].response,
              read: true,
              visible: true
            });
            onDecisionRemove(threadId, messageId);
            if (decision.id === "hints") {
              onDelayAdd(getHintDelay(selectedIndex));
            }
            decision.options[selectedIndex].triggers.map((trigger) => {
              onEventActivate(trigger.id);
            });
          }}
        />
      </View>
    ):null;
  }
}
