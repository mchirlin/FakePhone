import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Avatar } from 'react-native-elements'

import styles from '../../constants/styles'

export default class MessageListItem extends Component {

  render() {
    const {thread, lastMessage, onPress} = this.props
    const {navigation} = this.props

    return (
      <TouchableHighlight style={styles.mailItem} underlayColor='#999' onPress={() => {
          onPress(thread.id)
          navigation.navigate('MessageDetail', {itemId: thread.id, contact: thread.contact})
        }}>
        <View style={styles.rowLayout}>
          <Avatar
            containerStyle={styles.avatar}
            size="medium"
            rounded
            title={thread.contact.initials}
            activeOpacity={0.7}
            source={thread.contact.avatar?{uri: thread.contact.avatar}:null}
          />
        <View style={styles.baseContainer}>
            <View style={styles.mailItemHeader}>
              <Text style={lastMessage&&lastMessage.read?styles.textLarge:styles.textLargeBold}>{thread.contact.name}</Text>
              <Text style={styles.textMedium}>{lastMessage?lastMessage.time:null}</Text>
            </View>
            <Text style={styles.textSmall}>{lastMessage?(lastMessage.message?lastMessage.message:"[Picture attached]"):null}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
